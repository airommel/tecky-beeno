import createKnex, { Knex } from 'knex'

let config = require('./knexfile').development

export let knex: Knex = createKnex(config)
