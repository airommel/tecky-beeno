import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('room', table => {
    table.string('name').notNullable().unique()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('room', table => {
    table.dropColumn('name')
  })
}
