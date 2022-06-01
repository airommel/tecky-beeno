
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('user_level'))) {
    await knex.schema.createTable('user_level', table => {
      table.increments('id')
      table.string('name',16).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('username',32).notNullable()
      table.string('password',60).notNullable()
      table.integer('level_id').notNullable().references('user_level.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('category'))) {
    await knex.schema.createTable('category', table => {
      table.increments('id')
      table.string('name',16).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('file'))) {
    await knex.schema.createTable('file', table => {
      table.increments('id')
      table.string('name',260).notNullable()
      table.text('content').notNullable()
      table.boolean('is_file').notNullable()
      table.integer('category_id').notNullable().references('category.id')
      table.integer('owner_id').notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('file')
  await knex.schema.dropTableIfExists('category')
  await knex.schema.dropTableIfExists('user')
  await knex.schema.dropTableIfExists('user_level')
}

