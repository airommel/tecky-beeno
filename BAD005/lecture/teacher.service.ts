import { Knex } from 'knex'
import { HttpError } from './http-error'
import { UserService } from './user.service'

export class TeacherService {
  constructor(private knex: Knex, private userService: UserService) {}
  table() {
    return this.knex('teacher')
  }
  async createTeacher(name: string): Promise<number> {
    let user_id = await this.userService.createUser(name)
    let rows = await this.table().insert({ user_id }).returning('id')
    return rows[0] as number
  }
  async getTeacherIdByName(name: string) {
    let row = await // this.knex.from('teacher')
    this.table()
      .select('teacher.id')
      .innerJoin('user', 'user.id', 'teacher.user_id')
      .where({
        'user.name': name,
      })
      .first()
    if (!row) {
      throw new HttpError(404, 'teacher not found')
    }
    return row.id as number
  }
}
