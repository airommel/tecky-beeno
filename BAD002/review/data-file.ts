import jsonfile from 'jsonfile'
import { Request, Response } from 'express'
import path from 'path'

export class DataFile<Data> {
  private filename: string
  private dataPromise: Promise<Data>

  constructor(filename: string, private defaultValue: Data) {
    this.filename = path.join('data', filename)
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

  async getData() {
    return this.dataPromise
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
    await jsonfile.writeFile(this.filename, data)
  }
}
