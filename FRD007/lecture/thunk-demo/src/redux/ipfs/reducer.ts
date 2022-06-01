import { IPFSActionType } from './action'
import { IPFSState } from './state'

const initialState = (): IPFSState => {
  return {
    records: {},
  }
}

export const ipfsReducer = (
  state: IPFSState = initialState(),
  action: IPFSActionType,
): IPFSState => {
  switch (action.type) {
    case '@@IPFS/setContent':
      return {
        records: {
          ...state.records,
          [action.hash]: action.content,
        },
      }
    default:
      return state
  }
}
