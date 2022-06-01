import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
      table.boolean('is_admin').notNullable()
      table.string('avatar').nullable()
      table.string('email').nullable()
      table.string('ban_reason').nullable()
      table.string('password_hash', 60).nullable()
    })
  }

  if (!(await knex.schema.hasTable('memo'))) {
    await knex.schema.createTable('memo', table => {
      table.integer('user_id').notNullable().references('user.id')
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
      table.increments('id')
      table.string('image').nullable()
      table.text('content').notNullable()
      table.string('color').nullable()
    })
  }

  if (!(await knex.schema.hasTable('memo_history'))) {
    await knex.schema.createTable('memo_history', table => {
      table.increments('id')
      table.integer('memo_id').notNullable().references('memo.id')
      table.timestamp('created_at').nullable()
      table.text('content').notNullable()
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('memo_history')
  await knex.schema.dropTableIfExists('memo')
  await knex.schema.dropTableIfExists('user')
}
