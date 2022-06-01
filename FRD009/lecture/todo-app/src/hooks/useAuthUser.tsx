import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export function useAuthUser() {
  return useSelector((state: RootState) => state.auth.user)
}
