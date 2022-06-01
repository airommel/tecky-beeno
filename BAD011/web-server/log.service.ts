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

  async getStats() {
    let url_stats = await this.knex
      .from('request_log')
      .groupBy('url')
      .count('id as count')
      .select('url')
      .orderBy('count', 'asc')
    let user_agent_stats = await this.knex
      .from('request_log')
      .groupBy('user_agent')
      .count('id as count')
      .select('user_agent')
      .orderBy('count', 'asc')
    return { url_stats, user_agent_stats }
  }
}
