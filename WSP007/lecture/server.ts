import express, { Request, Response } from 'express'
import path from 'path'
import session from 'express-session'
import { print } from 'listening-on'
import { config } from 'dotenv'
import { useMemoList, saveMemoList, Memo } from './memo'
import multer from 'multer'

config()

let app = express()

let fileCounter = 0
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./uploads'))
  },
  filename: function (req, file, cb) {
    fileCounter++
    let timestamp = Date.now()
    let ext: string = file.mimetype.split('/').pop()!
    ext = ext.split('-').pop()!
    ext = ext.split(';')[0]
    if (ext != 'jpeg') {
      cb(new Error('Invalid photo'), null as any)
      req.res?.status(400).end('Invalid photo, only allow jpeg format')
    } else {
      cb(null, `${file.fieldname}-${timestamp}-${fileCounter}.${ext}`)
    }
  },
})
let upload = multer({ storage })
// let upload = multer({ dest: './uploads/' })

app.use(
  express.urlencoded({
    extended: false,
  }),
)

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

let visitor = 0
app.use((req, res, next) => {
  visitor++
  next()
})

app.get('/visitor', (req, res) => {
  res.write(visitor.toString())
  res.end()
})

app.get('/memo', (req, res) => {
  useMemoList(req, res, memoList => {
    let filter = req.query.filter
    if (filter == 'latest') {
    }
    if (filter == 'black-hole') {
    }
    let overviewMemoList = memoList.map(memo => memo.content)
    res.json({ overviewMemoList })
  })
})

// GET /user/123?fields=tel,nickname,email
// GET /memo/123?fields=history
app.get('/memo/:id', (req, res) => {
  useMemoList(req, res, memoList => {
    let id = +req.params.id
    if (!id) {
      res.status(400).end('missing id number in req.params')
      return
    }
    let memo = memoList[id - 1]
    if (!memo) {
      res.status(404).end('memo not found')
      return
    }
    let versionString = req.query.version
    if (typeof versionString != 'string') {
      res.status(400).end('missing version string in req.query')
      return
    }
    if (versionString == 'latest') {
      res.json({
        content: memo.content,
      })
      return
    }
    if (versionString == 'all-history') {
      res.json({
        history: memo.history,
      })
      return
    }
    let versionNumber = +versionString
    if (!versionNumber) {
      res
        .status(400)
        .end(
          'missing version in req.query, should be "latest" or "all-history" or a number starting from 1',
        )
      return
    }
    res.json({
      content: memo.history[versionNumber - 1],
    })
  })
})

app.patch('/memo/:id', (req, res) => {
  useMemoList(req, res, memoList => {
    let id = +req.params.id
    if (!id) {
      res.status(400).end('missing id number in req.params')
      return
    }
    let memo = memoList[id - 1]
    if (!memo) {
      res.status(404).end('memo not found')
      return
    }
    let content: string = req.body.content
    if (!content) {
      res.status(400).end('missing content in req.body')
      return
    }
    memo.history.push(memo.content)
    memo.content = content
    res.end('updated')
    saveMemoList(memoList)
  })
})

function createMemo(req: Request, res: Response) {
  useMemoList(req, res, memoList => {
    console.log('body:', req.body)
    console.log('file:', req.file)
    let content: string = req.body.content
    if (!content) {
      res.status(400).end('missing content in req.body')
      return
    }
    let color = req.body.color || req.body.custom_color
    if (!color) {
      res.status(400).end('missing color or custom_color in req.body')
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
    saveMemoList(memoList)
  })
}

app.post('/memo', (req, res) => {
  createMemo(req, res)
})

app.post('/memo-with-photo', upload.single('photo'), (req, res) => {
  createMemo(req, res)
})

app.delete('/memo/:id', (req, res) => {
  res.status(405).end('the history cannot be denied')
})

app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

let port = 8100

app.listen(port, () => {
  print(port)
})
