import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('teacher', table => {
    table.dropColumn('date_of_birth')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('teacher', table => {
    table.date('date_of_birth')
  })
}
