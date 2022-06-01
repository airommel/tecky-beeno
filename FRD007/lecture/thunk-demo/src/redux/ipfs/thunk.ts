import { get } from '../../api'
import { RootDispatch } from '../action'
import { setIPFSContentAction } from './action'

export function downloadFileThunk(hash: string) {
  return async (dispatch: RootDispatch) => {
    let url = `/ipfs/${hash}`
    let result = await get(url)
    if (result.error) {
      dispatch(
        setIPFSContentAction(hash, { type: 'error', error: result.error }),
      )
      return
    }
    if (typeof result == 'string') {
      dispatch(setIPFSContentAction(hash, { type: 'text', text: result }))
      return
    }
    dispatch(setIPFSContentAction(hash, { type: 'object', value: result }))
  }
}
