import { Knex } from 'knex'
import express from 'express'

export class LogService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex.table('log')
  }
  async logRequest(req: express.Request) {
    await this.table().insert({
      method: req.method,
      url: req.url,
      user_agent: req.headers.user_agent,
    })
  }

  async getRecentLogList() {
    let rows = await this.table().select('*').limit(10).orderBy('id', 'desc')
    return rows
  }
}
