import dotenv from 'dotenv'
import { Client } from 'pg'
import XLSX from 'xlsx'
dotenv.config()

type User = {
  username: string
  password: string
}

type Memo = {
  content: string
  image: string
}

var workbook = XLSX.readFile('WSP009-exercise.xlsx')
let userList = XLSX.utils.sheet_to_json<User>(workbook.Sheets.user)
// console.log(userList)
let memoList = XLSX.utils.sheet_to_json<Memo>(workbook.Sheets.memo)
// console.log(memoList)

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
})

async function main() {
  await client.connect()
  // let result = await client.query('select * from "user"')
  // console.log(result)
  // console.log(
  //   'fields:',
  //   result.fields.map(field => field.name),
  // )

  for (let user of userList) {
    // console.log(
    //   `insert into "user" (username, password) values ('${user.username}', '${user.password}')`,
    // )

    // let result = await client.query(
    //   'select id from "user" where username = $1',
    //   [user.username],
    // )
    // if (result.rowCount > 0) {
    //   for (let row of result.rows) {
    //     await client.query('select from "user" where id = $1', [row.id])
    //   }
    // }

    await client.query('delete from "user" where username = $1', [
      user.username,
    ])

    await client.query(
      `insert into "user" (username, password) values ($1, $2)`,
      [user.username, user.password],
    )
  }

  let result = await client.query('select * from "user"')
  console.log('users:')
  console.log(result.rows)

  for (let memo of memoList) {
    await client.query('delete from "memo" where content = $1', [memo.content])
    await client.query('insert into "memo" (content, image) values ($1, $2)', [
      memo.content,
      memo.image,
    ])
  }

  result = await client.query('select * from "memo"')
  console.log('number of memo:', result.rowCount)

  await client.end()
}

main()
