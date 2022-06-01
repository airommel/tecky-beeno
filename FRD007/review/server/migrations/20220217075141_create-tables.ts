
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('todo_item'))) {
    await knex.schema.createTable('todo_item', table => {
      table.increments('id')
      table.string('title', 50).notNullable()
      table.string('desc', 2000).notNullable()
      table.boolean('is_done').notNullable().defaultTo(false)
      table.integer('count').notNullable().defaultTo(0)
      table.timestamps(false, true)
    })
  }

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('todo_item')
}

