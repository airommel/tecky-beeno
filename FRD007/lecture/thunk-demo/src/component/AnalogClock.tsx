import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClockTimeAction } from '../redux/clock/action'
import { RootState } from '../redux/state'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'

export const AnalogClock = () => {
  const now = useSelector((state: RootState) => state.clock.now)
  const date = new Date(now)
  return (
    <div>
      analog clock: <Clock value={date} />
    </div>
  )
}
