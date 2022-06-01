import { upload } from './upload'
import express from 'express'
import { env } from './env'
import { imageService, logService } from './services'
import { ImageController } from './image-controller'
import cors from 'cors'

let app = express()
app.use(cors())

app.get('/', async (req, res) => {
  let time = Date.now()
  console.log(time, req.method, req.url)
  res.end('hello world from express inside docker with postgres')
  logService.logRequest(req)
})

app.get('/log', async (req, res) => {
  logService
    .getRecentLogList()
    .then(recentLogList => res.json({ recentLogList }))
})

app.use(new ImageController(upload, imageService).router)

app.listen(env.port, () => {
  console.log('listening on port', env.port)
})
