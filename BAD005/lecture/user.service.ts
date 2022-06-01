import { Knex } from 'knex'

export class UserService {
  constructor(private knex: Knex) {}

  async createUser(name: string) {
    let [user_id] = await this.knex
      .insert({ name })
      .into('user')
      .returning('id')
    return user_id
  }
}
