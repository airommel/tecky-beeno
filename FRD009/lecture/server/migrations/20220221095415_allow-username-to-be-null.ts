import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', table => {
    table.setNullable('username')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', table => {
    table.dropNullable('username')
  })
}
