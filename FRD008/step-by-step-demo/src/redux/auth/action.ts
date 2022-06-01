export function registerAction(user: { username: string; password: string }) {
  return { type: '@@Auth/register' as const, user }
}

export function loginAction(user: { username: string; password: string }) {
  return { type: '@@Auth/login' as const, user }
}

export function logoutAction() {
  return { type: '@@Auth/logout' as const }
}

export type AuthAction =
  | ReturnType<typeof registerAction>
  | ReturnType<typeof loginAction>
  | ReturnType<typeof logoutAction>
