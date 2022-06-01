import { knex } from './knex'
import { StudentService } from './student.service'
import { TeacherService } from './teacher.service'

// This should be ran only once, otherwise will produce duplicated data
// Should use the knex seed version
async function main() {
  let teacherService = new TeacherService(knex)
  let studentService = new StudentService(knex, teacherService)

  await teacherService.createTeacher('Alex')
  await teacherService.createTeacher('Gordon')

  await studentService.createStudentWithTeacherName({
    student_name: 'Alice',
    teacher_name: 'Alex',
  })

  await studentService.createStudentWithTeacherName({
    student_name: 'Gary',
    teacher_name: 'Gordon',
  })

  await knex.destroy()
}
main()
