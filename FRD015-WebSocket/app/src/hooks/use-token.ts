import { useStorageState } from 'react-use-storage-state'

export function useToken() {
  const [token, setToken] = useStorageState('token', '')
  return { token, setToken }
}
