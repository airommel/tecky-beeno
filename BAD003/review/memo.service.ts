import { Session, SessionData } from 'express-session'
import { Knex } from 'knex'
import { HttpError } from './http-error'
import type { Memo, MemoHistory, MemoListItem } from './models'

export class MemoService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex('memo')
  }
  async loadMemoList(): Promise<MemoListItem[]> {
    let page = 1
    let itemPerPage = 5
    // itemPerPage *= 1000

    let limit = itemPerPage
    let offset = (page - 1) * itemPerPage
    let dbMemoList: Memo[] = await this.table()
      .select('*')
      // .from('memo')
      .orderBy('id', 'desc')
      .limit(limit)
      .offset(offset)

    let memoHistoryList: Pick<MemoHistory, 'memo_id' | 'content'>[] =
      await this.knex
        .select('memo_id', 'content')
        .from('memo_history')
        .whereIn(
          'id',
          this.knex.select('id').from('memo').limit(limit).offset(offset),
        )

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
    let row: { content: string } | undefined
    try {
      row = await this.knex
        .select('content')
        .from('memo') //
        .where({ id })
        .first()
      // .where('id', id)
      // .where('id', '=', id)
      // .where('id', '>=', id)
    } catch (error) {
      console.error('Failed to check memo existence:', error)
      throw new HttpError(500, 'Database Error')
    }

    if (!row) {
      throw new HttpError(404, 'Memo Not Found')
    }

    return row.content
  }

  async deleteMemo(context: {
    memo_id: number
    user_id: number
    session: SessionData & Session
  }) {
    let content: string = await this.getContent(context.memo_id)
    try {
      let ban_reason = 'Attempt to censor: ' + content

      await this.knex('user')
        .update({ is_admin: false, ban_reason })
        .where({ id: context.user_id, is_admin: true })
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
    let row: { id: number } | undefined
    try {
      // TODO insert content of different combination to speed up checking
      let reversedChar = memo.content.split('').reverse().join('')
      let reversedWord = memo.content.split(' ').reverse().join(' ')
      row = await this.knex
        .select('id')
        .from('memo')
        .where({ content: memo.content })
        .orWhere({ content: reversedChar })
        .orWhere({ content: reversedWord })
        .first()
    } catch (error) {
      console.error('Failed to check memo content duplication:', error)
      throw new HttpError(500, 'Database Error')
    }
    if (row) {
      throw new HttpError(409, 'duplicated content')
    }

    try {
      let rows = await this.knex //
        .insert(memo)
        .into('memo')
        .returning('id')
      return rows[0] as number
    } catch (error) {
      console.error('Failed to insert memo:', error)
      throw new HttpError(500, 'Database Error')
    }
  }
}
