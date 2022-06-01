import { Knex } from 'knex'

export class UserService {
  constructor(public knex: Knex) {}
  table() {
    return this.knex('user')
  }
  async loginWithTel(tel: string) {
    return { token: 'TODO' }
  }
  async loginWithEmail(email: string) {
    return { token: 'TODO' }
  }
}
