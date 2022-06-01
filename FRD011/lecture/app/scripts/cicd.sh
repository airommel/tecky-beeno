set -e

## Variables

## Setup
npm install

## Test
CI=true npm test

## Build
npm run build

## Deploy
./scripts/deploy.sh
