#!/bin/bash
set -e
set -o pipefail
npx knex migrate:rollback --all
npx knex migrate:latest
