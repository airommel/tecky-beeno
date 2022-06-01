let commonPasswordList = [
  'password',
  '12345678',
  '99999999',
  '00000000',
  '123456789',
  'tecky.io',
]

// export function getCommonPasswordList() {
//   return commonPasswordList
// }

export function isCommonPassword(password: string): boolean {
  return commonPasswordList.includes(password)
}

export function getSampleCommonPasswordList(n: number) {
  return commonPasswordList.slice(0, n)
}
