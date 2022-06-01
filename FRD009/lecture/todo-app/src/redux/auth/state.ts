export type AuthState = {
  user: null | AuthUser
  registerResult: APIResultType
  loginResult: APIResultType
}

export type APIResultType =
  | { type: 'idle' }
  | { type: 'success'; token: string }
  | { type: 'fail'; message: string }

export type AuthUser = {
  token: string
  payload: JWTPayload
}

export type JWTPayload = {
  id: number // user_id
  exp: number // expire_at (ms)
  username?: string
  email?: string
}
