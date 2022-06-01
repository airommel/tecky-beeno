export function formatUserName(user: {
  title: string // e.g. Mrs / Mr / Ms
  surname: string
}) {
  return user.title + ' ' + user.surname
}

export function checkPassword(password: string): string | null {
  if (password.length > 8) {
    return 'password is too short, it should contains at least 8 letters'
  }
  return null
}
