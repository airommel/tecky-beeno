import express from 'express'
import path from 'path'
import session from 'express-session'

let pkg = require('./package.json')

let app = express()

app.use(
  session({
    secret: 'This should not be kept in code',
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
    visit?: number
    history?: string[]
  }
}

// to log the request history
app.use((req, res, next) => {
  console.log(req.method, req.url)
  console.log(req.session)
  next()
})

// to collect user browsing history
app.use((req, res, next) => {
  if (req.url != '/favicon.ico') {
    let visit = req.session.visit || 0
    visit++
    req.session.visit = visit

    let history = req.session.history || []
    history.push(req.url)
    req.session.history = history
  }
  next()
})

// app.use((req, res, next) => {
//   let filePath = path.join('public', req.url)
//   console.log('join result:', filePath )
//   filePath = path.resolve(filePath)
//   console.log('join resolve:', filePath )
//   res.sendFile(filePath)
// })

app.get('/', (req, res) => {
  console.log('A browser is asking to GET /')
  res.write('<p>Welcome to node.js server</p>')
  res.write('<p>version ' + pkg.version + '</p>')
  res.end()
})

app.use(express.static('public'))

let visit = 0
app.get('/stats', (req, res) => {
  visit++
  res.write(`You're the #${visit} visitor.`)
  res.end()
})

let userList = [
  { id: 1, username: 'alice' },
  { id: 2, username: 'bob' },
  { id: 3, username: 'charlie' },
  { id: 4, username: 'dave' },
  { id: 5, username: 'frank' },
]

app.get('/user-list', (req, res) => {
  res.end(/* html */ `
	<table>
	  <thead>
		  <tr>
			  <th>
				  ID
			  </th>
			  <th>
				  Username
			  </th>
		  </tr>
	  </thead>
		<tbody>
		  ${userList
        .map(
          user => /* html */ `
			<tr>
			  <td>
				  ${user.id}
			  </td>
			  <td>
				  ${user.username}
			  </td>
			</tr>
			`,
        )
        .join('')}
		</tbody>
	</table>
	`)
})

app.get('/last-page', (req, res) => {
  let history = req.session.history || []
  let lastPage = history[history.length - 2]
  res.end(lastPage)
})

// app.get('/about.html', (req, res) => {
//   let absolutePath = path.resolve('public', 'about.html')
//   res.sendFile(absolutePath)
// })

app.use((req, res) => {
  res.sendFile(path.resolve('public', '404.html'))
})

let PORT = 8000

app.listen(PORT, () => {
  console.log('listening on http://127.0.0.1:' + PORT)
})
