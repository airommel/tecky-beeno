import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('request_log', t => {
    t.setNullable('user_agent')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('request_log', t => {
    t.dropNullable('user_agent')
  })
}
