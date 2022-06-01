import { useEffect, useState } from 'react'
import { get } from '../api'
import { useToken } from './use-token'

export function useGet<T extends { error: string }>(
  url: string,
  initialValue: T,
) {
  const [state, setState] = useState(initialValue)
  const { token } = useToken()
  useEffect(() => {
    get(url, token).then(setState)
  }, [url, token])
  function render(fn: (state: T) => any) {
    if (state.error) {
      return <p className="text-error">{state.error}</p>
    }
    return fn(state)
  }
  return {
    state,
    setState,
    render,
  }
}
