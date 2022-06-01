import { AuthAction } from './action'
import { AuthState, AuthUser, JWTPayload } from './state'
import jwtDecode from 'jwt-decode'

function loadUserFromToken(token: string | null): AuthUser | null {
  if (!token) {
    return null
  }
  try {
    let payload: JWTPayload = jwtDecode(token)
    console.log('token payload:', payload)
    return { payload, token }
  } catch (error) {
    console.error('Failed to code JWT:', error)
    return null
  }
}

function initialState(): AuthState {
  let token = localStorage.getItem('token')

  return {
    user: loadUserFromToken(token),
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
      return {
        ...state,
        user: null,
        loginResult: {
          type: 'idle',
        },
      }
    case '@@Auth/setRegisterResult':
      return {
        ...state,
        registerResult: action.result,
        user: loadUserFromToken(
          action.result.type === 'success' ? action.result.token : null,
        ),
      }
    case '@@Auth/setLoginResult':
      return {
        ...state,
        loginResult: action.result,
        user: loadUserFromToken(
          action.result.type === 'success' ? action.result.token : null,
        ),
      }
    default:
      return state
  }
}
