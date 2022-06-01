import { env } from './env'
import { knex } from './knex'

describe('database TestSuit', () => {
  test('knexfile should have test profile', () => {
    expect(require('./knexfile')).toHaveProperty(env.NODE_ENV)
  })
  it('should migrate to latest version', async () => {
    let config = undefined
    let all = true
    await knex.migrate.rollback(config, all)
    await knex.migrate.latest()
  })
  it('should seed without error', async () => {
    await knex.seed.run()
  })
})
