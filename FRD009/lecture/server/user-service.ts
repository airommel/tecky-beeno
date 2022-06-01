import { Knex } from 'knex'
import { comparePassword, hashPassword } from './hash'
import { HttpError } from './http-error'
import {
  JWTPayload,
  LoginUserWithOAuthDTO,
  LoginUserWithPasswordDTO,
  NewTodoItemDTO,
  RegisterUserWithPasswordDTO,
  TodoItem,
} from './models'
import jwt from 'jwt-simple'
import { jwtConfig } from './jwt'

let SECOND = 1000
let MINUTE = SECOND * 60
let HOUR = MINUTE * 60
let DAY = HOUR * 24

export class UserService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex('user')
  }

  createToken(user: Omit<JWTPayload, 'exp'>) {
    let payload: JWTPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      exp: Date.now() + 90 * DAY,
    }
    let token: string = jwt.encode(payload, jwtConfig.jwtSecret)
    return token
  }

  decodeToken(token: string) {
    let payload: JWTPayload
    try {
      payload = jwt.decode(token, jwtConfig.jwtSecret)
    } catch (error) {
      throw new HttpError('Invalid JWT token: ' + error, 401)
    }
    if (payload.exp <= Date.now()) {
      throw new HttpError('Expired JWT token, expired at:' + payload.exp, 401)
    }
    return payload
  }

  async register(user: RegisterUserWithPasswordDTO) {
    let rows: any[] = await this.table()
      .insert({
        username: user.username,
        password_hash: await hashPassword(user.password),
      })
      .returning('id')
    let id = rows[0].id as number
    let token: string = this.createToken({ id, username: user.username })
    return token
  }

  async loginWithPassword(user: LoginUserWithPasswordDTO) {
    let row = await this.table()
      .select('id', 'password_hash', 'username')
      .where({ username: user.username })
      .first()
    if (!row) {
      throw new HttpError('User not found, username: ' + user.username, 401)
    }
    let isMatch = await comparePassword({
      password: user.password,
      password_hash: row.password_hash,
    })
    if (!isMatch) {
      throw new HttpError('Wrong username or password', 401)
    }
    let token: string = this.createToken(row)
    return token
  }

  async loginWithOAuth(user: { email: string }) {
    let row = await this.table()
      .select('id', 'username')
      .where({ email: user.email })
      .first()
    if (row) {
      let token: string = this.createToken({
        id: row.id,
        username: row.username,
        email: user.email,
      })
      return token
    }
    let rows = await this.table().insert({ email: user.email }).returning('id')
    let id = rows[0].id
    let token: string = this.createToken({ id, email: user.email })
    return token
  }

  async list() {
    let rows = await this.table().select('*')
    return rows as TodoItem[]
  }

  async get(id: number) {
    let row = await this.table().select('*').where({ id }).first()
    if (!row) {
      throw new HttpError('Todo Item not found, id: ' + id, 404)
    }
    return row as TodoItem
  }

  async update(id: number, todo: Partial<TodoItem>) {
    await this.table().update(todo).where({ id })
  }

  async incCount(id: number) {
    await this.table()
      .update({ count: this.knex.raw('count + 1') })
      .where({ id })
  }
}
