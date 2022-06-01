
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('log'))) {
    await knex.schema.createTable('log', table => {
      table.increments('id')
      table.string('method', 6).notNullable()
      table.string('url', 2048).notNullable()
      table.string('user_agent', 256).nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('image'))) {
    await knex.schema.createTable('image', table => {
      table.increments('id')
      table.string('filename', 256).notNullable()
      table.timestamps(false, true)
    })
  }

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('image')
  await knex.schema.dropTableIfExists('log')
}

