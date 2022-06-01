import { Knex } from 'knex'
import { hashPassword } from './hash-password'
import { TagService } from './tag.service'
import { ensureString } from './validate'
import { closest } from 'fastest-levenshtein'

export class UserService {
  private userLevelService = new TagService(this.knex, 'user_level')

  constructor(private knex: Knex) {}

  async importUser(row: unknown) {
    let username = ensureString(row, 'username')
    let password = ensureString(row, 'password')
    let level = ensureString(row, 'level')

    let knex = this.knex

    let level_id: number = await this.userLevelService.getOrInsertId(level)

    let seedRow = {
      level_id,
      username,
      password_hash: await hashPassword(password),
    }
    try {
      let user_id = await this.getIdByUsername(username)
      await knex('user').update(seedRow).where({ id: user_id })
      return user_id
    } catch (error) {
      let rows = await knex.insert(seedRow).into('user').returning('id')
      return rows[0] as number
    }
  }

  async getIdByUsername(username: string): Promise<number> {
    let knex = this.knex
    let row = await knex.select('id').from('user').where({ username }).first()
    if (!row) {
      // throw new HttpError(404, 'user not found, username: ' + username)
      console.debug('user not found, username: ' + username, 'auto fixing...')
      let allRows = await knex.select('username').from('user')
      let fixedUsername = closest(
        username,
        allRows.map(row => row.username),
      )
      console.debug('fixed', username, '-->', fixedUsername)
      return this.getIdByUsername(fixedUsername)
    }
    return row.id
  }
}
