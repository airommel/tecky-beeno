import { ThunkDispatch } from 'redux-thunk'
import { RootAction } from './action'
import { RootState } from './state'

export type RootThunkDispatch = ThunkDispatch<RootState, null, RootAction>
