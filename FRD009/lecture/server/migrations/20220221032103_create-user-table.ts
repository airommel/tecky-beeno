import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('user')) return
  await knex.schema.createTable('user', table => {
    table.increments('id')
    table.string('username', 32).unique().notNullable()
    table.string('password_hash', 60).nullable()
    table.string('email', 255).unique().nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user')
}
