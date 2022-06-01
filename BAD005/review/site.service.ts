import { Knex } from 'knex'

export class SiteService {
  constructor(private knex: Knex) {}

  async seedSite(url: string): Promise<number> {
    let domain = url.split('/')[2]
    let row = await this.knex
      .select('id')
      .from('site')
      .where({ domain })
      .first()
    if (row) {
      return row.id as number
    }
    let rows = await this.knex.insert({ domain }).into('site').returning('id')
    return rows[0] as number
  }
}
