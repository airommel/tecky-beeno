import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startClockThunk, stopClockThunk } from './thunk'

export const ClockProvider = (props: { children: any }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClockThunk())
    return () => {
      dispatch(stopClockThunk())
    }
  }, [dispatch])
  return <>{props.children}</>
}
