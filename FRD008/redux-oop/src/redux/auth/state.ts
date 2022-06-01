export type AuthState = {
  user: null | AuthUser
  // username -> password
  userPasswordDict: Record<string, string>
  registerResult: APIResultType
  loginResult: APIResultType
}

export type APIResultType =
  | { type: 'idle' }
  | { type: 'success'; message: string }
  | { type: 'fail'; message: string }

export type AuthUser = {
  username: string
}
