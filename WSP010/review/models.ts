export type User = {
  id: number
  is_admin: boolean
  username: string
  password: string
  ban_reason: string | null
}

export type Memo = {
  id: number
  user_id: number
  content: string
  color: string | null
  // history: string[]
  photo: string | null
}

export type MemoHistory = {
  id: number
  memo_id: number
  content: string
}

export type InsertRow<Row> = Omit<Row, 'id'>

export type MemoListItem = Memo & {
  history: string[]
}
