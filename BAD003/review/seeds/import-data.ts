import { Knex } from 'knex'
import { join } from 'path'
import { DataFile } from '../data-file'
import { hashPassword } from '../hash'
import { InsertRow, Memo, User } from '../models'
import crypto from 'crypto'
import XLSX from 'xlsx'

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

export async function seed(knex: Knex): Promise<void> {
  async function importUser(user: InsertRow<JsonUser>) {
    if (!user.password) {
      console.log('import user without password, email:', user.username)
      user.password = crypto.randomBytes(20).toString('hex')
      console.log('auto generate password:', user.password)
    }

    let result = await knex.raw('select id from "user" where email = ?', [
      user.username,
    ])
    let password_hash = await hashPassword(user.password)
    if (result.rowCount == 0) {
      await knex.raw(
        `insert into "user" (email, password_hash, is_admin, ban_reason) values (?, ?, ?, ?)`,
        [user.username, password_hash, user.is_admin, user.ban_reason],
      )
    } else {
      let id = result.rows[0].id
      await knex.raw(
        /* sql */ `
      update "user"
      set password_hash = ?
        , is_admin = ?
        , ban_reason = ?
      where id = ?
`,
        [password_hash, user.is_admin, user.ban_reason, id],
      )
    }
  }

  async function importMemo(memo: InsertRow<Memo>) {
    await knex.raw('delete from "memo" where content = ?', [memo.content])
    // await knex.raw(
    //   'insert into "memo" (content, image, user_id) values (?, ?, ?)',
    //   [memo.content, memo.image || null, memo.user_id],
    // )
    await knex.insert(memo).into('memo')
  }

  let sampleUsername = 'sample@tecky.io'
  await importUser({
    username: sampleUsername,
    password: 'sample',
    is_admin: false,
    ban_reason: null,
  })

  let result = await knex.raw('select id from "user" where email = ?', [
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
}
