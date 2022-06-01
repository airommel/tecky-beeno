import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', table => {
    table.renameColumn('password', 'password_hash')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', table => {
    table.renameColumn('password_hash', 'password')
  })
}
