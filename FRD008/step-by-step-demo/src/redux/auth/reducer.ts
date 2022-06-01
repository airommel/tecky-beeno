import { AuthAction } from './action'
import { AuthState } from './state'

function initialState(): AuthState {
  let username = localStorage.getItem('username')
  return {
    user: username ? { username } : null,
    userPasswordDict: {},
    registerResult: { type: 'idle' },
    loginResult: { type: 'idle' },
  }
}

export function authReducer(
  state: AuthState = initialState(),
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case '@@Auth/logout':
      localStorage.removeItem('username')
      return {
        ...state,
        user: null,
        loginResult: {
          type: 'idle',
        },
      }
    case '@@Auth/register': {
      if (action.user.username in state.userPasswordDict) {
        // this username is already registered
        return {
          ...state,
          registerResult: {
            type: 'fail',
            message: `"${action.user.username}" is already occupied by others`,
          },
        }
      }
      // register success
      localStorage.setItem('username', action.user.username)
      return {
        ...state,
        user: { username: action.user.username },
        userPasswordDict: {
          ...state.userPasswordDict,
          [action.user.username]: action.user.password,
        },
        registerResult: {
          type: 'success',
          message: `"${action.user.username}" is registered successfully`,
        },
      }
    }
    case '@@Auth/login': {
      if (!(action.user.username in state.userPasswordDict)) {
        // this username is not registered
        return {
          ...state,
          loginResult: {
            type: 'fail',
            message: `"${action.user.username}" is not registered`,
          },
        }
      }
      if (
        state.userPasswordDict[action.user.username] !== action.user.password
      ) {
        // wrong password
        return {
          ...state,
          loginResult: {
            type: 'fail',
            message: `The password for "${action.user.username}" doesn't match`,
          },
        }
      }
      // login success
      localStorage.setItem('username', action.user.username)
      return {
        ...state,
        user: { username: action.user.username },
        loginResult: {
          type: 'success',
          message: `Login as "${action.user.username}" successfully`,
        },
      }
    }
    default:
      return state
  }
}
