import { Knex } from 'knex'

export class LogService {
  constructor(private knex: Knex) {}

  async logRequest(row: { method: string; url: string; user_agent?: string }) {
    await this.knex.insert(row).into('request_log')
  }

  async getRecentLogs() {
    let rows = await this.knex
      .select('id', 'method', 'url', 'user_agent', 'created_at as timestamp')
      .from('request_log')
      .limit(10)
      .orderBy('timestamp', 'desc')
    return rows
  }
}
