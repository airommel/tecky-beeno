import { knex } from './knex'

describe('database seed', () => {
  beforeEach(async () => {
    await knex.migrate.rollback({}, true)
    await knex.migrate.latest()
  })
  it('should prevent creating multiple teacher with same name', async () => {
    await knex.seed.run()
    let rows = await knex
      .select('id', 'name')
      .from('user')
      .where({ name: 'Alex' })
    expect(rows).toHaveLength(1)
  })
})
