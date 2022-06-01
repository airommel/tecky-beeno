import { Session, SessionData } from 'express-session'
import type { Client, QueryResult } from 'pg'
import { HttpError } from './http-error'
import type { Memo, MemoHistory, MemoListItem } from './models'

export class MemoService {
  constructor(private client: Client) {}
  async loadMemoList(): Promise<MemoListItem[]> {
    let page = 1
    let itemPerPage = 5
    // itemPerPage *= 1000

    let limit = itemPerPage
    let offset = (page - 1) * itemPerPage
    let result = await this.client.query(
      /* sql */ `
    select * from memo
    order by id desc
    limit $1
    offset $2
  `,
      [limit, offset],
    )
    let dbMemoList: Memo[] = result.rows

    result = await this.client.query(
      /* sql */ `select memo_id, content from memo_history where id in (
    select id from memo limit $1 offset $2
  )`,
      [limit, offset],
    )
    let memoHistoryList: Pick<MemoHistory, 'memo_id' | 'content'>[] =
      result.rows

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

  async getContent(id: number): Promise<string> {
    let result: QueryResult
    try {
      result = await this.client.query(
        'select content from memo where id = $1',
        [id],
      )
    } catch (error) {
      console.error('Failed to check memo existence:', error)
      throw new HttpError(500, 'Database Error')
    }

    if (result.rowCount == 0) {
      throw new HttpError(404, 'Memo Not Found')
    }
    return result.rows[0].content
  }

  async deleteMemo(context: {
    memo_id: number
    user_id: number
    session: SessionData & Session
  }) {
    let content: string = await this.getContent(context.memo_id)
    try {
      let ban_reason = 'Attempt to censor: ' + content
      await this.client.query(
        /* sql */ `
        update "user"
        set is_admin = false
          , ban_reason = $1
        where id = $2
          and is_admin = true
        `,
        [ban_reason, context.user_id],
      )
    } catch (error) {
      console.error('Failed ban admin:', error)
      throw new HttpError(500, 'Database Error')
    }
    context.session.user.is_admin = false
    context.session.save()
    throw new HttpError(405, "You're fired")
  }

  async createMemo(memo: {
    user_id: number
    content: string
    color: string
    image: string | null
  }): Promise<number> {
    let result: QueryResult
    try {
      // TODO insert content of different combination to speed up checking
      let reversedChar = memo.content.split('').reverse().join('')
      let reversedWord = memo.content.split(' ').reverse().join(' ')
      result = await this.client.query(
        'select id from memo where content = $1 or content = $2 or content = $3',
        [memo.content, reversedChar, reversedWord],
      )
    } catch (error) {
      console.error('Failed to check memo content duplication:', error)
      throw new HttpError(500, 'Database Error')
    }
    if (result.rowCount != 0) {
      throw new HttpError(409, 'duplicated content')
    }

    try {
      let result = await this.client.query(
        /* sql */ `
        insert into memo 
        (user_id, content, color, image)
        values
        ($1, $2, $3, $4)
        returning id
      `,
        [memo.user_id, memo.content, memo.color, memo.image],
      )
      return result.rows[0].id
    } catch (error) {
      console.error('Failed to insert memo:', error)
      throw new HttpError(500, 'Database Error')
    }
  }
}
