import dayjs from 'dayjs'
import { config } from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import fs from 'fs'
import { print } from 'listening-on'
import path from 'path'
import { Memo, memoDataFile } from './memo'
import { upload } from './upload'
import { userDataFile } from './user'

config()

let app = express()

app.use(express.urlencoded({ extended: false }))

if (!process.env.SESSION_SECRET) {
  throw new Error('missing SESSION_SECRET in env')
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
    counter: number
    is_admin: boolean
  }
}

function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (req.session.is_admin) {
    next()
  } else {
    res.status(401).end('Only accessible by admin')
  }
}

app.use((req, res, next) => {
  let counter = req.session.counter || 0
  counter++
  req.session.counter = counter
  req.session.save()

  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.log(`[${time}]`, `Request (${counter})`, req.url)
  next()
})

app.get('/memo', (req, res) => {
  memoDataFile.useData(req, res, memoList => {
    res.json(memoList)
  })
})

app.post('/memo', upload.single('photo'), (req, res) => {
  memoDataFile.useData(req, res, memoList => {
    // console.log('post memo, body:', req.body)
    // console.log('post memo, file:', req.file)
    function cleanup() {
      if (req.file) {
        fs.unlink(req.file.path, error => {
          console.error('Failed to cleanup memo photo:', error)
        })
      }
    }
    let content: string = req.body.content
    if (!content) {
      res.status(400).end('missing content in req.body')
      cleanup()
      return
    }
    let color = req.body.color || req.body.custom_color
    if (!color) {
      res.status(400).end('missing color or custom_color in req.body')
      cleanup()
      return
    }
    let memo: Memo = {
      content,
      color,
      history: [],
    }
    if (req.file) {
      memo.photo = req.file.filename
    }
    memoList.push(memo)
    res.setHeader('Content-Type', 'text/html')
    res.end(
      /* html */
      `Created. <a href="/memo">Check Latest List</a> <a href="/">Submit next memo.</a>`,
    )
    // res.redirect('/memo')
    memoDataFile.saveData(memoList)
  })
})

app.post('/login', (req, res) => {
  userDataFile.useData(req, res, userList => {
    if (!req.body.username || typeof req.body.username != 'string') {
      res.status(400).end('Missing username string in req.body')
      return
    }
    if (!req.body.password || typeof req.body.password != 'string') {
      res.status(400).end('Missing password string in req.body')
      return
    }
    for (let user of userList) {
      if (
        user.username == req.body.username &&
        user.password == req.body.password
      ) {
        req.session.is_admin = true
        req.session.save()
        res.end('OK')
        return
      }
    }
    res.status(400).end('Wrong')
  })
})

app.get('/user', (req, res) => {
  res.json({ is_admin: req.session.is_admin })
})

app.get('/secret', adminOnly, (req, res) => {
  res.json('why are you asking?')
})

app.use(express.static('public'))
app.use('/admin', adminOnly, express.static('admin'))

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

let port = 8100

app.listen(port, () => {
  print(port)
})
