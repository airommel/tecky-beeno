import { Knex } from 'knex'
import { HttpError } from './http-error'

export class TagService {
  constructor(protected knex: Knex, private tableName: string) {}

  async createTag(name: string) {
    let rows = await this.knex
      .insert({ name })
      .into(this.tableName)
      .returning('id')
    return rows[0] as number
  }

  async getTagId(name: string) {
    let knex = this.knex
    let row = await knex
      .select('id')
      .from(this.tableName)
      .where({ name })
      .first()
    if (!row) {
      throw new HttpError(404, 'level not found')
    }
    return row.id
  }

  async getOrInsertId(name: string): Promise<number> {
    try {
      return await this.getTagId(name)
    } catch (error) {
      return await this.createTag(name)
    }
  }
}
