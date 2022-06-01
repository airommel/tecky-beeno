import { StudentService } from './student.service'
import { knex } from './knex'
import { TeacherService } from './teacher.service'
import { UserService } from './user.service'

describe('student service', () => {
  let studentService: StudentService

  beforeEach(() => {
    let userService = new UserService(knex)
    let teacherService = new TeacherService(knex, userService)
    studentService = new StudentService(knex, teacherService, userService)
  })

  it('should rollback all migrate without error', async () => {
    await knex.migrate.rollback({}, true)
  })

  it('should migrate to latest without error', async () => {
    await knex.migrate.latest()
  })

  it('should get student id by name', async () => {
    let user_id_list = await knex
      .insert([{ name: 'alice' }, { name: 'bob' }, { name: 'charlie' }])
      .into('user')
      .returning('id')
    await knex
      .insert([
        { user_id: user_id_list[0], entry_year: '2012' },
        { user_id: user_id_list[1], entry_year: '2013' },
        { user_id: user_id_list[2], entry_year: '2014' },
      ])
      .into('student')
    expect(await studentService.getStudentIdByName('alice')).toBe(
      user_id_list[0],
    )
    expect(await studentService.getStudentIdByName('bob')).toBe(user_id_list[1])
    expect(await studentService.getStudentIdByName('charlie')).toBe(
      user_id_list[2],
    )
  })
})
