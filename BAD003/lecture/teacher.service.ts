import { Knex } from 'knex'
import { HttpError } from './http-error'

export class TeacherService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex('teacher')
  }
  async createTeacher(name: string): Promise<number> {
    // let rows = await this.knex.insert({ name }).into('teacher').returning('id')
    let rows = await this.table().insert({ name }).returning('id')
    return rows[0] as number
  }
  async getTeacherIdByName(name: string) {
    // let query = this.knex.select('id').from('teacher').where({
    //   name,
    // }).first()
    // console.log(query.toSQL())

    let row = await // this.knex.from('teacher')
    this.table()
      .select('id')
      .where({
        name,
      })
      .first()
    if (!row) {
      throw new HttpError(404, 'teacher not found')
    }
    return row.id as number
  }
}
