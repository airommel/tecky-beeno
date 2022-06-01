import { APIResultType } from './state'

export function logoutAction() {
  return { type: '@@Auth/logout' as const }
}

export function setLoginResultAction(result: APIResultType) {
  return { type: '@@Auth/setLoginResult' as const, result }
}
export function setRegisterResultAction(result: APIResultType) {
  return { type: '@@Auth/setRegisterResult' as const, result }
}

export type AuthAction =
  | ReturnType<typeof setLoginResultAction>
  | ReturnType<typeof setRegisterResultAction>
  | ReturnType<typeof logoutAction>
