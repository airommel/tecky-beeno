import { Knex } from 'knex'

export class UserService {
  constructor(private knex: Knex) {}
  createUser() {
    this.knex
  }
}
