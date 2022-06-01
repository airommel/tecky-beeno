import { Knex } from 'knex'
import { HttpError } from './http-error'
import { TeacherService } from './teacher.service'
import { UserService } from './user.service'
import redis from 'redis'

export class StudentService {
  constructor(
    private knex: Knex,
    private teacherService: TeacherService,
    private userService: UserService,
    private redis: redis.RedisClientType,
  ) {}
  async createStudent(row: { name: string; teacher_id: number }) {
    let user_id = await this.userService.createUser(row.name)
    let [student_id] = await this.knex
      .insert({
        user_id,
      })
      .into('student')
      .returning('id')
    await this.knex
      .insert({ teacher_id: row.teacher_id, student_id })
      .into('teaching')
    return student_id
  }
  async createStudentWithTeacherName(row: {
    student_name: string
    teacher_name: string
  }) {
    let teacher_id = await this.teacherService.getTeacherIdByName(
      row.teacher_name,
    )
    return this.createStudent({ name: row.student_name, teacher_id })
  }
  table() {
    return this.knex('student')
  }

  async rename(row: { id: number; from_name: string; to_name: string }) {
    await this.redis.del('student:name:' + row.from_name)
    await this.knex.update({ name: row.to_name }).where({ id: row.id })
    await this.redis.set('student:name:' + row.to_name, row.id)
  }

  async getStudentIdByName(name: string) {
    let cache = await this.redis.get('student:name:' + name)
    if (cache) {
      return cache
    }
    let row = await this.table()
      .select('student.id')
      .innerJoin('user', 'user.id', 'student.user_id')
      .where({
        'user.name': name,
      })
      .first()
    if (!row) {
      throw new HttpError(404, 'student not found')
    }
    await this.redis.set('student:name:' + name, row.id)
    return row.id as number
  }
}
