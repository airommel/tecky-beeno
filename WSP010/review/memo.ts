import { Application } from 'express'
import { upload } from './upload'
import fs from 'fs'
import { adminOnly, loginOnly } from './guard'
import { InsertRow, Memo, MemoHistory, MemoListItem } from './models'
import { client } from './db'

async function loadMemoList(): Promise<MemoListItem[]> {
  let page = 1
  let itemPerPage = 5
  itemPerPage *= 1000

  let limit = itemPerPage
  let offset = (page - 1) * itemPerPage
  let result = await client.query(
    /* sql */ `
    select * from memo
    limit $1
    offset $2
  `,
    [limit, offset],
  )
  let dbMemoList: Memo[] = result.rows

  result = await client.query(
    /* sql */ `select memo_id, content from memo_history where id in (
    select id from memo limit $1 offset $2
  )`,
    [limit, offset],
  )
  let memoHistoryList: Pick<MemoHistory, 'memo_id' | 'content'>[] = result.rows

  let memoList: MemoListItem[] = dbMemoList.map(memo => {
    return {
      ...memo,
      history: [],
    }
  })

  memoHistoryList.forEach(history => {
    let memo = memoList.find(memo => memo.id == history.memo_id)
    if (memo) {
      memo.history.push(history.content)
    }
  })

  return memoList
}

export function attachMemoRoutes(app: Application) {
  app.get('/memo', async (req, res) => {
    try {
      let memoList = await loadMemoList()
      res.json({ memoList })
    } catch (error) {
      console.error('Failed to load memo list:', error)
      res.status(500).json({ message: 'Database Error' })
    }
  })

  app.post('/memo', loginOnly, upload.single('photo'), async (req, res) => {
    let user = req.session.user!
    function cleanup() {
      if (req.file) {
        fs.unlink(req.file.path, error => {
          console.error('Failed to cleanup memo photo:', error)
        })
      }
    }
    let content: string = req.body.content
    if (!content) {
      res.status(400).json({ message: 'missing content' })
      cleanup()
      return
    }
    let color = req.body.color || req.body.custom_color
    if (!color) {
      res.status(400).json({ message: 'missing color or custom_color' })
      cleanup()
      return
    }
    try {
      // TODO insert content of different combination to speed up checking
      let reversedChar = content.split('').reverse().join('')
      let reversedWord = content.split(' ').reverse().join(' ')
      let result = await client.query(
        'select id from memo where content = $1 or content = $2 or content = $3',
        [content, reversedChar, reversedWord],
      )
      if (result.rowCount != 0) {
        res.status(409).json({ message: 'duplicated content' })
        return
      }
    } catch (error) {
      console.error('Failed to check memo content duplication:', error)
      res.status(500).json({ message: 'Database Error' })
      return
    }

    let memo: InsertRow<Memo> = {
      user_id: user.id,
      content,
      color,
      photo: null,
    }
    if (req.file) {
      memo.photo = req.file.filename
    }

    try {
      await client.query(
        /* sql */ `
        insert into memo 
        (user_id, content, color, photo)
        values
        ($1, $2, $3, $4)
      `,
        [memo.user_id, memo.content, memo.color, memo.photo],
      )
    } catch (error) {
      console.error('Failed to insert memo:', error)
      res.status(500).json({ message: 'Database Error' })
      return
    }

    res.json({ message: 'Created Memo' })
  })

  app.delete('/memo/:id', adminOnly, async (req, res) => {
    let sessionUser = req.session.user!

    let id = +req.params.id
    if (!id) {
      res.status(400).json({ message: 'invalid id in req.params' })
      return
    }

    let content: string
    try {
      let result = await client.query(
        'select content from memo where id = $1',
        [id],
      )
      if (result.rowCount == 0) {
        res.status(404).json({ message: 'memo not found' })
        return
      }
      content = result.rows[0].content
    } catch (error) {
      console.error('Failed to check memo existence:', error)
      res.status(500).json({ message: 'Database Error' })
      return
    }

    sessionUser.is_admin = false
    req.session.save()

    try {
      let ban_reason = 'Attempt to censor: ' + content
      await client.query(
        /* sql */ `
        update "user"
        set is_admin = false
        set ban_reason = $1
        where id = $2
          and is_admin = true
        `,
        [ban_reason, sessionUser.id],
      )
    } catch (error) {
      console.error('Failed ban admin:', error)
      res.status(500).json({ message: 'Database Error' })
      return
    }

    res.status(405).json({ message: "You're fired" })
  })
}
