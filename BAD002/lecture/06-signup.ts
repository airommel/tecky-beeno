import express from 'express'
import { client } from './db'

export let app = express()
app.use(express.json())

app.post('/signup', handleSignup)

export async function handleSignup(
  req: express.Request,
  res: express.Response,
) {
  let errors: string[] = []
  if (!(req.body?.username?.length >= 3)) {
    errors.push('Invalid username, should be at least 3 characters')
  }
  if (!(req.body?.password?.length >= 8)) {
    errors.push('Invalid password, should be at least 8 characters')
  }
  if (errors.length > 0) {
    res.status(400).json({ errors })
    return
  }
  try {
    let result = await client.query(
      'insert into "user" (username, password) values ($1,$2) returning id',
      [req.body.username, req.body.password],
    )
    res.json(result.rows[0])
  } catch (error: any) {
    res.status(500).json({ error: error.toString() })
  }
}
