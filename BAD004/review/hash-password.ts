import { hash, compare } from 'bcrypt'

const ROUND = 12

export function hashPassword(password: string) {
  return hash(password, ROUND)
}

export function comparePassword(options: {
  password: string
  password_hash: string
}) {
  return compare(options.password, options.password_hash)
}
