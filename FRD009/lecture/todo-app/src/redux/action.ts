import { Dispatch } from 'redux'
import { AuthAction } from './auth/action'

export type AppAction = AuthAction

export type AppDispatch = Dispatch<AppAction>
