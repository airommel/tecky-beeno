import { useEffect, useState } from 'react'
import { get, getWithToken } from '../api'
import { ErrorMessage } from '../components/ErrorMessage'
import { LoadingMessage } from '../components/LoadingMessage'
import { useAuthUser } from './useAuthUser'

export function useGet<T extends object>(url: string) {
  const [state, setState] = useState<T & { loading: boolean; error?: string }>({
    loading: true,
  } as any)
  useEffect(() => {
    get(url).then(json => {
      setState({ loading: false, ...json })
    })
  }, [url])
  return state
}

export function useGetWithToken<T extends object>(url: string) {
  const [state, setState] = useState<
    T & {
      loading: boolean
      error?: string
    }
  >({
    loading: true,
  } as any)
  const token = useAuthUser()?.token
  const download = (url: string, token?: string) => {
    setState({ ...state, loading: true })
    getWithToken(token, url).then(json => {
      setState({ loading: false, ...json })
    })
  }
  useEffect(() => {
    download(url, token)
  }, [url, token])
  const render = (name: string, content: (state: T) => any) => {
    return (
      <>
        {state.loading ? (
          <LoadingMessage message={'loading ' + name}></LoadingMessage>
        ) : state.error ? (
          <ErrorMessage
            message={'failed to load ' + name + ': ' + state.error}
          ></ErrorMessage>
        ) : (
          content(state)
        )}
      </>
    )
  }
  const refresh = () => {
    download(url, token)
  }
  return { state, render, refresh }
}
