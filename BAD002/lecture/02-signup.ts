import express from 'express'

export let app = express()
app.use(express.json())

app.post('/signup', handleSignup)

export function handleSignup(req: express.Request, res: express.Response) {
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
  res.json({ id: 1 })
}
