import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_level', table => {
    table.unique(['name'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_level', table => {
    table.dropUnique(['name'])
  })
}

