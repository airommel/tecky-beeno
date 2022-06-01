import { Knex } from 'knex'

export class UserService {
  constructor(private knex: Knex) {}

  async seedUserByName(username: string): Promise<number> {
    let row = await this.knex
      .select('id')
      .from('user')
      .where({ username })
      .first()
    if (row) {
      return row.id as number
    }
    let rows = await this.knex.insert({ username }).into('user').returning('id')
    return rows[0] as number
  }
}
