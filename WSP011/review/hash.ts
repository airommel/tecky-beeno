import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12

/**
 * @returns Promise<string> of length 60
 */
export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  // console.log({ password, hash })
  return hash
}

export async function comparePassword(
  password: string,
  saltedHash: string,
): Promise<boolean> {
  const matched = await bcrypt.compare(password, saltedHash)
  // console.log({ password, matched })
  return matched
}

// async function test() {
//   let hash = await hashPassword('123')
//   console.log({ hash, length: hash.length })
//   await comparePassword('456', hash)
//   await comparePassword('123', hash)
// }

// test()
