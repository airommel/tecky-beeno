import { RootDispatch } from '../action'
import { RootState } from '../state'
import { setClockTimeAction, setClockTimerAction } from './action'

export let name = 'TODO'

export function startClockThunk() {
  return (dispatch: RootDispatch) => {
    let timer = setInterval(() => {
      dispatch(setClockTimeAction(Date.now()))
    }, 500)
    dispatch(setClockTimerAction(timer))
  }
}

export function stopClockThunk() {
  return (dispatch: RootDispatch, getState: () => RootState) => {
    let timer = getState().clock.timer
    if (!timer) {
      return
    }
    clearInterval(timer)
    dispatch(setClockTimerAction(null))
  }
}
