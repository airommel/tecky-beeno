#!/bin/bash
set -e
set -o pipefail

npx knex migrate:down
erd-to-knex < docs/erd.txt > migrations/20220110100352_create-tables-for-topic-collection.ts
npx knex migrate:up
pg-to-erd | grep -v created_at | grep -v updated_at > docs/erd2.txt
meld docs/erd.txt docs/erd2.txt
rm docs/erd2.txt
