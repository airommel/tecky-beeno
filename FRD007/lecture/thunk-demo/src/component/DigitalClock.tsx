import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClockTimeAction } from '../redux/clock/action'
import { RootState } from '../redux/state'

export const DigitalClock = () => {
  const now = useSelector((state: RootState) => state.clock.now)
  const text = new Date(now).toLocaleString()
  return <div>digital clock: {text}</div>
}
