import { Auth } from './auth-oop/state'
import { AuthState } from './auth/state'

export type RootState = {
  auth: AuthState
  authObject: Auth
}
