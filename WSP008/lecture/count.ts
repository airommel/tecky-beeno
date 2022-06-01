import { DataFile } from './data-file'
import { Application } from 'express'

export let countDataFile = new DataFile('count.json', 0)

export function attachCountRoutes(app: Application) {
  app.get('/count', (req, res) => {
    countDataFile.useData(req, res, count => {
      res.json({ count })
    })
  })
  app.patch('/count', (req, res) => {
    let count = +req.body.count
    if (!count) {
      res.status(400).json({ message: 'Invalid body, expect numeric count' })
      return
    }
    countDataFile.saveData(count)
    res.json({ message: 'ok' })
  })
  app.post('/count/inc', (req, res) => {
    countDataFile.useData(req, res, count => {
      count++
      countDataFile.saveData(count)
      res.json({ count })
    })
  })
}
