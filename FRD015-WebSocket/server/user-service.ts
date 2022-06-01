import { Knex } from 'knex'
import { comparePassword, hashPassword } from './hash'
import { HttpError } from './http-error'
import jwt from 'jwt-simple'
import { JWTPayload } from './model'
import { env } from './env'

export class UserService {
  constructor(public knex: Knex) {}

  async register(user: { username: string; password: string }) {
    let password_hash = await hashPassword(user.password)
    let rows: any[] = await this.knex
      .insert({ username: user.username, password_hash })
      .into('user')
      .returning('id')
    let id = rows[0].id as number
    let token = this.createToken(id)
    return { token }
  }

  async login(user: { username: string; password: string }) {
    let row = await this.knex
      .select('password_hash', 'id')
      .from('user')
      .where({ username: user.username })
      .first()
    if (!row) {
      throw new HttpError(401, 'user not found')
    }
    if (
      !(await comparePassword({
        password: user.password,
        password_hash: row.password_hash,
      }))
    ) {
      throw new HttpError(401, 'wrong username or password')
    }
    let token = this.createToken(row.id)
    return { token }
  }

  createToken(id: number) {
    let payload: JWTPayload = { id }
    let token: string = jwt.encode(payload, env.JWT_SECRET)
    return token
  }
}
