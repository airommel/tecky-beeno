import { Knex } from 'knex'
import XLSX from 'xlsx'
import { UserService } from '../user.service'
import { CategoryService } from '../category.service'
import { ensureString } from '../validate'
import { FileService } from '../file.service'

export async function seed(knex: Knex): Promise<void> {
  let userService = new UserService(knex)
  let categoryService = new CategoryService(knex)
  let fileService = new FileService(knex, categoryService, userService)

  let workBook = XLSX.readFile('BAD004-exercise.xlsx')
  let userList = XLSX.utils.sheet_to_json(workBook.Sheets['user'])
  let categoryList = XLSX.utils.sheet_to_json(workBook.Sheets['category'])
  let fileList = XLSX.utils.sheet_to_json(workBook.Sheets['file'])

  for (let row of userList) {
    await userService.importUser(row)
  }

  for (let row of categoryList) {
    await categoryService.getOrInsertId(ensureString(row, 'name'))
  }

  for (let row of fileList) {
    await fileService.importFile(row)
  }
}
