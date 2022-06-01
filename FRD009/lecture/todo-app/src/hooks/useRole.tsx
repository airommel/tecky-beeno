import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export function useRole() {
  return useSelector((state: RootState) =>
    !state.auth.user ? ('guest' as const) : ('user' as const),
  )
}
