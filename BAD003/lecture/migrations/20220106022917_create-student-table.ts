import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('student'))) {
    await knex.schema.createTable('student', table => {
      table.increments('id')
      table.integer('teacher_id').references('teacher.id')
      table.string('name')
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('student')
}
