import { Knex } from 'knex'

export class ImageService {
  constructor(public knex: Knex) {}
  table() {
    return this.knex('image')
  }
  async storeImage(filename: string) {
    let rows = await this.table().insert({ filename }).returning('id')
    return rows[0].id as number
  }
  async storeImageList(filenameList: string[]) {
    let rows = await this.table()
      .insert(filenameList.map(filename => ({ filename })))
      .returning('id')
    return rows.map(row => row.id as number)
  }
  async getImageList() {
    let rows: Array<{ id: number; filename: string }> =
      await this.table().select('id', 'filename')
    return rows
  }
}
