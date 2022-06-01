
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('site'))) {
    await knex.schema.createTable('site', table => {
      table.increments('id')
      table.text('domain').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.text('username').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('topic'))) {
    await knex.schema.createTable('topic', table => {
      table.increments('id')
      table.text('thread_id').notNullable()
      table.integer('site_id').notNullable().references('site.id')
      table.integer('like_count').notNullable()
      table.text('title').notNullable()
      table.integer('user_id').notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('topic')
  await knex.schema.dropTableIfExists('user')
  await knex.schema.dropTableIfExists('site')
}

