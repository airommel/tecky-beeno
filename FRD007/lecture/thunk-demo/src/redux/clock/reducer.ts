import { ClockActionType } from './action'
import { ClockState } from './state'

const initialState = (): ClockState => {
  return {
    now: Date.now(),
    timer: null,
  }
}

export const clockReducer = (
  state: ClockState = initialState(),
  action: ClockActionType,
): ClockState => {
  switch (action.type) {
    case '@@Clock/setClockTime': {
      return {
        ...state,
        now: action.now,
      }
    }
    case '@@Clock/setClockTimer': {
      return {
        ...state,
        timer: action.timer,
      }
    }
    default:
      return state
  }
}
