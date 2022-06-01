import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { RootState } from './state'

export const rootReducer = combineReducers<RootState, any>({
  auth: authReducer,
})
