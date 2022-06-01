import { compare, hash } from 'bcryptjs'

let ROUND = 12

export async function hashPassword(password: string) {
  let digest: string = await hash(password, ROUND)
  // console.log(digest.length)
  return digest
}

export async function comparePassword(o: {
  password: string
  password_hash: string
}) {
  let isMatch: boolean = await compare(o.password, o.password_hash)
  return isMatch
}

// hashPassword('testing')
