import { ClockState } from './clock/state'
import { IPFSState } from './ipfs/state'

export type RootState = {
  clock: ClockState
  ipfs: IPFSState
}
