import { hash, compare } from 'bcryptjs'

const SALT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  let password_hash: string = await hash(password, SALT_ROUNDS)
  return password_hash
}

export async function comparePassword(input: {
  password: string
  password_hash: string
}): Promise<boolean> {
  let is_match: boolean = await compare(input.password, input.password_hash)
  return is_match
}
