import type { Client } from 'pg'

export class UserService {
  constructor(private client: Client) {}

  async signup(user: { username: string; password: string }): Promise<number> {
    let result = await this.client.query(
      'insert into "user" (username, password) values ($1,$2) returning id',
      [user.username, user.password],
    )
    return result.rows[0].id
  }
}
