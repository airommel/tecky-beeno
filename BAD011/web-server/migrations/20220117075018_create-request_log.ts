import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('request_log'))) {
    await knex.schema.createTable('request_log', table => {
      table.increments('id')
      table.string('method', 6).notNullable()
      table.string('url', 2048).notNullable()
      table.string('user_agent', 255).notNullable()
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('request_log')
}
