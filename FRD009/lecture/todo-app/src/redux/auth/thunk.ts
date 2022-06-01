import { post, postWithToken } from '../../api'
import { AppDispatch } from '../action'
import { RootState } from '../state'
import {
  logoutAction,
  setLoginResultAction,
  setRegisterResultAction,
} from './action'

export function logoutThunk() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    localStorage.removeItem('token')
    dispatch(logoutAction())
  }
}

export function loginWithPasswordThunk(user: {
  username: string
  password: string
}) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let json = await post('/user/login/password', user)
    if (json.error) {
      dispatch(setLoginResultAction({ type: 'fail', message: json.error }))
    } else {
      localStorage.setItem('token', json.token)
      dispatch(
        setLoginResultAction({
          type: 'success',
          token: json.token,
        }),
      )
    }
  }
}

export function loginWithFacebookThunk(accessToken: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let json = await post('/user/login/facebook', { accessToken })
    if (json.error) {
      dispatch(setLoginResultAction({ type: 'fail', message: json.error }))
    } else {
      localStorage.setItem('token', json.token)
      dispatch(
        setLoginResultAction({
          type: 'success',
          token: json.token,
        }),
      )
    }
  }
}

export function registerThunk(user: { username: string; password: string }) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let json = await post('/user/register', user)
    if (json.error) {
      dispatch(setRegisterResultAction({ type: 'fail', message: json.error }))
    } else {
      localStorage.setItem('token', json.token)
      dispatch(
        setRegisterResultAction({
          type: 'success',
          token: json.token,
        }),
      )
    }
  }
}

export function postItem(item: { title: string }) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let token = getState().auth.user?.token
    let json = await postWithToken(token, '/item', item)
    if (json.error) {
      // dispatch a failed action
      return
    } else {
      // dispatch a success action
      return
    }
  }
}
