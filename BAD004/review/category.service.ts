import { Knex } from 'knex'
import { TagService } from './tag.service'

export class CategoryService extends TagService {
  constructor(knex: Knex) {
    super(knex, 'category')
  }
}
