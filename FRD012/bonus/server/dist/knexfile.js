"use strict";
exports.__esModule = true;
var env_1 = require("./env");
// Update with your config settings.
var config = {
    local: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        }
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    development: {
        client: 'postgresql',
        connection: env_1.env.database,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: env_1.env.database,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
module.exports = config;
