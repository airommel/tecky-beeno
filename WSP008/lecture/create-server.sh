npm init --yes

npm install \
  express \
	listening-on \
	express-session \
	dotenv

npm install -D \
  ts-node \
	typescript \
	ts-node-dev \
	@types/node \
	@types/express \
	@types/express-session

npm set-script test "ts-node-dev server.ts"

mkdir -p public
echo '404 page not found' > public/404.html

echo '
node_modules
package-lock.json
pnpm-lock.yaml
.env
' > .gitignore

echo '{
  "compilerOptions": {
    "strict": true,
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "exclude": ["node_modules", "build", "scripts", "index.js"]
}
' > tsconfig.json

echo "
import express from 'express'
import path from 'path'
import session from 'express-session'
import { print } from 'listening-on'
import { config } from 'dotenv'

config()

let app = express()

if(!process.env.SESSION_SECRET) {
	throw new Error('missing SESSION_SECRET in env')
}

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
  saveUninitialized: true,
}))

app.use(express.static('public'))

app.use((req, res)=>{
	res.status(404).sendFile(path.resolve(path.join('public', '404.html')))
})

let port = 8100

app.listen(port, () => {
  print(port)
})
" > server.ts