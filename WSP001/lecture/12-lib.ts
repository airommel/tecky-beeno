export function formatDate(date: Date | string | number) {
  return new Date(date).toLocaleString()
}

export function formatNumber(number: number) {
  return number.toFixed(2)
  // return number.toLocaleString()
  // return number
}

export type User = {
  title: string
  firstName: string
}
export function formatUser(user: User) {
  return user.title + ' ' + user.firstName
}

export default {
  formatDate,
  formatNumber,
  formatUser,
  isDefault: true,
}

export let isDefault = false
