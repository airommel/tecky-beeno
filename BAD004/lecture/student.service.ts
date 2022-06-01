import { Knex } from 'knex'
import { HttpError } from './http-error'
import { TeacherService } from './teacher.service'

export class StudentService {
  constructor(private knex: Knex, private teacherService: TeacherService) {}
  async createStudent(row: { name: string; teacher_id: number }) {
    let rows = await this.knex.insert(row).into('student').returning('id')
    return rows[0] as number
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
  async getStudentIdByName(name: string) {
    let row = await this.table()
      .select('id')
      .where({
        name,
      })
      .first()
    if (!row) {
      throw new HttpError(404, 'student not found')
    }
    return row.id as number
  }
}
