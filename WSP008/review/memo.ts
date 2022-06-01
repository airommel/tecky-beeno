import { Application } from 'express'
import { DataFile } from './data-file'
import { upload } from './upload'
import fs from 'fs'
import { adminOnly } from './guard'
import { userDataFile } from './user'

export type Memo = {
  content: string
  color?: string
  history: string[]
  photo?: string
}

export let memoDataFile = new DataFile<Memo[]>('memo-list.json', [])

export function attachMemoRoutes(app: Application) {
  app.get('/memo', (req, res) => {
    memoDataFile.useData(req, res, memoList => {
      res.json({ memoList })
    })
  })

  app.post('/memo', upload.single('photo'), (req, res) => {
    memoDataFile.useData(req, res, memoList => {
      // console.log('post memo, body:', req.body)
      // console.log('post memo, file:', req.file)
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
      let reversedChar = content.split('').reverse().join('')
      let reversedWord = content.split(' ').reverse().join(' ')
      let memo = memoList.find(
        memo =>
          memo.content == content ||
          memo.content == reversedChar ||
          memo.content == reversedWord,
      )
      if (memo) {
        res.status(409).json({ message: 'duplicated content' })
        return
      }
      memo = {
        content,
        color,
        history: [],
      }
      if (req.file) {
        memo.photo = req.file.filename
      }
      memoList.push(memo)
      res.setHeader('Content-Type', 'text/html')
      res.json({ message: 'Created Memo' })
      // res.redirect('/memo')
      memoDataFile.saveData(memoList)
    })
  })

  app.delete('/memo', adminOnly, (req, res) => {
    let content = req.body.content
    if (!content) {
      res.status(400).json({ message: 'missing content in req.body' })
      return
    }
    memoDataFile.useData(req, res, memoList => {
      const memo = memoList.find(memo => memo.content == content)
      if (!memo) {
        res.status(404).json({ message: 'memo not found' })
        return
      }
      userDataFile.useData(req, res, userList => {
        if (!req.session.user) {
          res
            .status(500)
            .json({ message: 'adminOnly is not working as expected' })
          return
        }
        let user = userList.find(
          user => user.username == req.session.user?.username,
        )
        if (!user) {
          res.status(500).json({ message: 'user not found' })
          return
        }
        if (!user.is_admin) {
          res
            .status(500)
            .json({ message: 'adminOnly is not working as expected' })
          return
        }
        user.is_admin = false
        user.ban_reason = 'Attempt to censor: ' + memo.content
        userDataFile.saveData(userList)
        req.session.user.is_admin = false
        req.session.save()
        res.status(405).json({ message: "You're fired" })
      })
    })
  })
}
