
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('username', 256).notNullable()
      table.string('password_hash', 60).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('room'))) {
    await knex.schema.createTable('room', table => {
      table.increments('id')
      table.integer('creator_id').notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('message'))) {
    await knex.schema.createTable('message', table => {
      table.increments('id')
      table.integer('room_id').notNullable().references('room.id')
      table.text('content').notNullable()
      table.integer('sender_id').notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('message')
  await knex.schema.dropTableIfExists('room')
  await knex.schema.dropTableIfExists('user')
}

