import express from 'express'
import { db } from './db'
import { env } from './env'

let app = express()

app.get('/', async (req, res) => {
  let time = Date.now()
  console.log(time, req.method, req.url)
  res.end('hello world from express inside docker with postgres')
  await db.query(/* sql */ `insert into log (method, url) values ($1,$2)`, [
    req.method,
    req.url,
  ])
})

app.get('/log', async (req, res) => {
  let result = await db.query(/* sql */ `select * from log`)
  res.json(result.rows)
})

app.listen(env.port, () => {
  console.log('listening on port', env.port)
})

async function main() {
  await db.connect()
  console.log('connected db')
  await migrate()
}
async function migrate() {
  await db.query(/* sql */ `
create table if not exists log (
  id serial
, method text
, url text
, timestamp timestamp default current_timestamp
);
`)
}

main().catch(err => {
  console.error('failed to connect db:', err)
  process.exit(1)
})
