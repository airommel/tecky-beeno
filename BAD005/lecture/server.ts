import http from 'http'
import express from 'express'

export type Server = {
  close: () => Promise<void>
}

export function startServer(port: number) {
  let app = express()
  app.use(express.static('public'))
  let server = http.createServer(app)
  function close() {
    return new Promise<void>((resolve, reject) => {
      server.close(err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
  return new Promise<Server>((resolve, reject) => {
    try {
      server.listen(port, () => {
        resolve({
          close,
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}
