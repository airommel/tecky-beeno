import { clockReducer } from './clock/reducer'
import { combineReducers } from 'redux'
import { RootState } from './state'
import { ipfsReducer } from './ipfs/reducer'

export const rootReducer = combineReducers<RootState, any>({
  clock: clockReducer,
  ipfs: ipfsReducer,
})
