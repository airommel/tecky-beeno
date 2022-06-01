import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // await knex.schema.createTableIfNotExists() // this is buggy

  if (!(await knex.schema.hasTable('teacher'))) {
    await knex.schema.createTable('teacher', table => {
      table.increments('id')
      table.string('name')
      table.date('date_of_birth')
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('teacher')
}
