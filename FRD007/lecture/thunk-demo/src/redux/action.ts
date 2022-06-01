import { ClockActionType } from './clock/action'
import { Dispatch } from 'redux'
import { IPFSActionType } from './ipfs/action'

export type RootAction = ClockActionType | IPFSActionType

export type RootDispatch = Dispatch<RootAction>
