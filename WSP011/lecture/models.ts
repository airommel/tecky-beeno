export type User = {
  id: number
  is_admin: boolean
  username: string
  // password: string
  password_hash: string
  ban_reason: string | null
}

export type Memo = {
  id: number
  user_id: number
  content: string
  color: string | null
  // history: string[]
  // photo: string | null
  image: string | null
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
