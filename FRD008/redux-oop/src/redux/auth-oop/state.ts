import { RootState } from '../state'
import { ReduxAdapter } from './redux-adapter'

export class Auth extends ReduxAdapter<Auth> {
  user: null | AuthUser = null
  userPasswordDict: Record<string, string> = {}
  registerResult: APIState = new IdleState()
  loginResult: APIState = new IdleState()

  getInstance(state: RootState): typeof this {
    return state.authObject as typeof this
  }

  register(user: LoginUser) {
    if (user.username in this.userPasswordDict) {
      this.registerResult = new FailState(
        `"${user.username}" is already occupied by others`,
      )
      return
    }

    localStorage.setItem('username', user.username)
    this.user = user
    this.userPasswordDict[user.username] = user.password
    this.registerResult = new SuccessState(
      `"${user.username}" is registered successfully`,
    )
  }

  login(user: LoginUser) {
    if (!(user.username in this.userPasswordDict)) {
      // this username is not registered
      this.loginResult = new FailState(`"${user.username}" is not registered`)
      return
    }
    if (this.userPasswordDict[user.username] !== user.password) {
      // wrong password
      this.loginResult = new FailState(
        `The password for "${user.username}" doesn't match`,
      )
      return
    }
    // login success
    localStorage.setItem('username', user.username)
    this.user = user
    this.loginResult = new SuccessState(
      `Login as "${user.username}" successfully`,
    )
    return
  }

  logout() {
    this.user = null
    this.loginResult = new IdleState()
  }
}

export interface AuthUser {
  username: string
}

export interface LoginUser {
  username: string
  password: string
}

export interface APIState<T = any> {
  type: T
}

export class IdleState implements APIState<'idle'> {
  type = 'idle' as const
}

export class SuccessState implements APIState<'success'> {
  type = 'success' as const
  message: string
  constructor(message: string) {
    this.message = message
  }
}

export class FailState implements APIState<'fail'> {
  type = 'fail' as const
  message: string
  constructor(message: string) {
    this.message = message
  }
}
