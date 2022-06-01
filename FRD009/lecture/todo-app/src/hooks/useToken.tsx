import { useAuthUser } from './useAuthUser'

export function useToken() {
  return useAuthUser()?.token
}
