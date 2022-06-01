import { join } from 'path'
import XLSX from 'xlsx'
import { DataFile } from './data-file'
import { client, connectPromise } from './db'
import { InsertRow, Memo, User } from './models'
import crypto from 'crypto'
import { hashPassword } from './hash'

type XlsxUser = {
  username: string
  password: string
}

type XlsxMemo = {
  content: string
  image: string
}

type JsonUser = Omit<User, 'id' | 'password_hash'> & {
  password: string
}

type JsonMemo = Omit<Memo, 'id' | 'image'> & {
  photo: string
}

async function importUser(user: InsertRow<JsonUser>) {
  // await client.query('delete from "user" where username = $1', [user.username])

  if (!user.password) {
    console.log('import user without password, username:', user.username)
    user.password = crypto.randomBytes(20).toString('hex')
    console.log('auto generate password:', user.password)
  }

  let result = await client.query('select id from "user" where username = $1', [
    user.username,
  ])
  if (result.rowCount == 0) {
    let password_hash = await hashPassword(user.password)
    await client.query(
      `insert into "user" (username, password_hash, is_admin, ban_reason) values ($1, $2, $3, $4)`,
      [user.username, password_hash, user.is_admin, user.ban_reason],
    )
  } else {
    let id = result.rows[0].id
    await client.query(
      /* sql */ `
      update "user"
      set password = $1
        , is_admin = $2
        , ban_reason = $3
      where id = $4
`,
      [user.password, user.is_admin, user.ban_reason, id],
    )
  }
}

async function importMemo(memo: InsertRow<Memo>) {
  await client.query('delete from "memo" where content = $1', [memo.content])
  await client.query(
    'insert into "memo" (content, image, user_id) values ($1, $2, $3)',
    [memo.content, memo.image, memo.user_id],
  )
}

async function main() {
  await connectPromise

  let sampleUsername = 'sample@tecky.io'
  await importUser({
    username: sampleUsername,
    password: 'sample',
    is_admin: false,
    ban_reason: null,
  })

  let result = await client.query('select id from "user" where username = $1', [
    sampleUsername,
  ])
  let sampleUserId = result.rows[0].id

  var workbook = XLSX.readFile(join('data', 'WSP009-exercise.xlsx'))

  let userDataFile = new DataFile<JsonUser[]>('user-list.json', [])
  let memoDataFile = new DataFile<JsonMemo[]>('memo-list.json', [])

  let xlsxUserList = XLSX.utils.sheet_to_json<XlsxUser>(workbook.Sheets.user)
  for (let user of xlsxUserList) {
    await importUser({
      username: user.username,
      password: user.password,
      is_admin: true,
      ban_reason: null,
    })
  }
  let jsonUserList = await userDataFile.getData()
  for (let user of jsonUserList) {
    await importUser({
      username: user.username,
      password: user.password,
      is_admin: user.is_admin,
      ban_reason: user.ban_reason || null,
    })
  }

  let xlsxMemoList = XLSX.utils.sheet_to_json<XlsxMemo>(workbook.Sheets.memo)
  for (let memo of xlsxMemoList) {
    await importMemo({
      content: memo.content,
      image: memo.image,
      user_id: sampleUserId,
      color: null,
    })
  }
  let jsonMemoList = await memoDataFile.getData()
  for (let memo of jsonMemoList) {
    await importMemo({
      user_id: sampleUserId,
      content: memo.content,
      image: memo.photo,
      color: memo.color,
    })
  }

  await client.end()
}

main()
