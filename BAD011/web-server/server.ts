import express from 'express'
import { apiRoutes } from './api'
import { env } from './env'
import { logRequestMiddleware } from './middleware/log-request-middleware'
import { print } from 'listening-on'

let app = express()

app.use(logRequestMiddleware)

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(apiRoutes)

app.listen(env.PORT, () => {
  print(env.PORT)
})
