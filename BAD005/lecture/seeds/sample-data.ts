import { Knex } from 'knex'
import { StudentService } from '../student.service'
import { TeacherService } from '../teacher.service'
import { UserService } from '../user.service'

export async function seed(knex: Knex): Promise<void> {
  let userService = new UserService(knex)
  let teacherService = new TeacherService(knex, userService)
  let studentService = new StudentService(knex, teacherService, userService)

  async function getTeacherId(name: string): Promise<number> {
    try {
      return await teacherService.getTeacherIdByName(name)
    } catch (error) {
      return await teacherService.createTeacher(name)
    }
  }

  async function seedStudent(row: {
    student_name: string
    teacher_name: string
  }) {
    let teacher_id = await getTeacherId(row.teacher_name)
    try {
      await studentService.getStudentIdByName(row.student_name)
    } catch (error) {
      await studentService.createStudent({ name: row.student_name, teacher_id })
    }
  }

  await seedStudent({ teacher_name: 'Alex', student_name: 'Alice' })
  await seedStudent({ teacher_name: 'Alex', student_name: 'Alexander' })
  await seedStudent({ teacher_name: 'Gordon', student_name: 'Gary' })
}
