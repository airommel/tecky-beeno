import { client, connectPromise } from './db'
import { hashPassword } from './hash'

async function main() {
  await connectPromise

  let result = await client.query(
    /* sql */
    `select id, password from "user" where password_hash is null`,
  )
  console.log('number of password to migrate:', result.rowCount)
  for (let row of result.rows) {
    let hash = await hashPassword(row.password)
    await client.query(
      /* sql */ `
		  update "user"
			set password_hash = $1
			  , password = null
			where id = $2
		`,
      [hash, row.id],
    )
  }

  await client.end()
}
main()
