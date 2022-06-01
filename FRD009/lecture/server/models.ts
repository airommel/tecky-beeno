export type NewTodoItemDTO = {
  title: string
  desc: string
}

export type TodoItem = {
  id: number
  is_done: 1 | 0
  count: number
} & NewTodoItemDTO

export type RegisterUserWithPasswordDTO = {
  username: string
  password: string
}
export type LoginUserWithPasswordDTO = {
  username: string
  password: string
}
export type LoginUserWithOAuthDTO = {
  accessToken: string
}

export type User = {
  id: number
  username: string
  password_hash?: string
  email?: string
}

export type JWTPayload = {
  id: number // user_id
  exp: number // expire_at (ms)
  username?: string
  email?: string
}
