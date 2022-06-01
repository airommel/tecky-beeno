import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  /* Create User Table */
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('name', 32).unique()
      table.timestamps(false, true)
    })
  }
  await knex.raw(/* sql */ `
	  insert into "user" (name, created_at, updated_at)
		select name, created_at, updated_at from teacher
	`)
  await knex.raw(/* sql */ `
	  insert into "user" (name, created_at, updated_at)
		select name, created_at, updated_at from student
	`)

  /* Update Student Table */
  await knex.schema.alterTable('student', table => {
    table.integer('entry_year')
    table.integer('user_id').references('user.id')
  })
  await knex.raw(/* sql */ `
	  update student
		set entry_year = extract(year from created_at),
		    user_id = (select id from "user" where "user".name = student.name)
	`)
  await knex.schema.alterTable('student', table => {
    table.dropColumn('name')
  })

  /* Create Subject Table */
  if (!(await knex.schema.hasTable('subject'))) {
    await knex.schema.createTable('subject', table => {
      table.increments('id')
      table.string('name')
      table.timestamps(false, true)
    })
  }

  /* Update Teacher Table */
  await knex.schema.alterTable('teacher', table => {
    table.integer('user_id').references('user.id')
    table.integer('subject_id').references('subject.id')
  })
  await knex.raw(/* sql */ `
	  update teacher
		set user_id = (select id from "user" where "user".name = teacher.name)
	`)
  await knex.schema.alterTable('teacher', table => {
    table.dropColumn('name')
  })

  /* Create Teaching Table */
  if (!(await knex.schema.hasTable('teaching'))) {
    await knex.schema.createTable('teaching', table => {
      table.increments('id')
      table.integer('teacher_id').references('teacher.id')
      table.integer('student_id').references('student.id')
      table.timestamps(false, true)
    })
  }
  await knex.raw(/* sql */ `
	  insert into teaching (teacher_id, student_id)
		select teacher_id, id as student_id from student
	`)
  await knex.schema.alterTable('student', table => {
    table.dropColumn('teacher_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  /* Remove Teaching Table */
  await knex.schema.alterTable('student', table => {
    table.integer('teacher_id').references('teacher.id')
  })
  await knex.raw(/* sql */ `
	  update student
		set teacher_id = (select teacher_id from teaching where teaching.student_id = student.id)
	`)
  await knex.schema.dropTable('teaching')

  /* Restore Teacher Table */
  await knex.schema.alterTable('teacher', table => {
    table.string('name')
  })
  await knex.raw(/* sql */ `
	  update teacher
		set name = (select "user".name from "user" where "user".id = teacher.user_id)
	`)
  await knex.schema.alterTable('teacher', table => {
    table.dropColumn('user_id')
    table.dropColumn('subject_id')
  })

  /* Remove Subject Table */
  await knex.schema.dropTableIfExists('subject')

  /* Restore Student Table */
  await knex.schema.alterTable('student', table => {
    table.string('name')
  })
  await knex.raw(/* sql */ `
	  update student
		set name = (select "user".name from "user" where "user".id = student.user_id)
	`)
  await knex.schema.alterTable('student', table => {
    table.dropColumn('user_id')
    table.dropColumn('entry_year')
  })

  /* Remove User Table */
  await knex.schema.dropTableIfExists('user')
}
