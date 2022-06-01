import jsonfile from 'jsonfile'
import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import util from 'util'

let mkdir = util.promisify(fs.mkdir)

let dataDir = 'data'

export class DataFile<Data> {
  private filename: string
  private dataPromise: Promise<Data>

  constructor(filename: string, private defaultValue: Data) {
    this.filename = path.join(dataDir, filename)
    this.dataPromise = this.loadData()
  }

  private async loadData(): Promise<Data> {
    try {
      let data = await jsonfile.readFile(this.filename)
      return data
    } catch (error) {
      return this.defaultValue
    }
  }

  async useData(req: Request, res: Response, callback: (data: Data) => void) {
    try {
      let data = await this.dataPromise
      callback(data)
    } catch (error: any) {
      res.status(500).end(error.toString())
    }
  }

  async saveData(data: Data) {
    this.dataPromise = Promise.resolve(data)
    await mkdir(dataDir, { recursive: true })
    await jsonfile.writeFile(this.filename, data)
  }
}
