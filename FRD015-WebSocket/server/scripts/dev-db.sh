#!/bin/bash
set -e
set -o pipefail
npx format-erd docs/erd.txt
npx knex migrate:rollback --all
npx erd-to-knex < docs/erd.txt > migrations/20220317025639_create-tables.ts
npx knex migrate:latest
