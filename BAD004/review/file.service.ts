import { Knex } from 'knex'
import { CategoryService } from './category.service'
import { HttpError } from './http-error'
import { UserService } from './user.service'
import { ensureString } from './validate'

export class FileService {
  constructor(
    private knex: Knex,
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  async importFile(row: unknown) {
    let knex = this.knex

    let name = ensureString(row, 'name')

    let value = (row as any).is_file
    let is_file = value == 1 ? true : value == 0 ? false : null
    if (is_file == null) {
      throw new HttpError(400, 'invalid is_file:' + value)
    }

    let content = is_file ? ensureString(row, 'Content') : null

    let category = ensureString(row, 'category')
    let owner = ensureString(row, 'owner')
    // use edit distance to auto fix instead
    // if (owner == 'gordan') {
    //   owner = 'gordon'
    // } else if (owner == 'alexs') {
    //   owner = 'alex'
    // }

    let seedRow = {
      name,
      content,
      is_file,
      category_id: await this.categoryService.getTagId(category),
      owner_id: await this.userService.getIdByUsername(owner),
    }
    try {
      let file_id = await this.getIdByFilename(name)
      await knex('file').update(seedRow).where({ id: file_id })
      return file_id
    } catch (error) {
      let rows = await knex.insert(seedRow).into('file').returning('id')
      return rows[0] as number
    }
  }

  async getIdByFilename(filename: string) {
    let row = await this.knex
      .select('id')
      .from('file')
      .where({ name: filename })
      .first()
    if (!row) {
      throw new HttpError(404, 'file not found')
    }
    return row.id
  }
}
