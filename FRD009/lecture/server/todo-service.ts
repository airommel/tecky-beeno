import { Knex } from 'knex'
import { HttpError } from './http-error'
import { NewTodoItemDTO, TodoItem } from './models'

export class TodoService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex('todo_item')
  }

  async create(todo: NewTodoItemDTO) {
    let rows: any[] = await this.table().insert(todo).returning('id')
    return rows[0].id as number
  }

  async list() {
    let rows = await this.table().select('*')
    return rows as TodoItem[]
  }

  async get(id: number) {
    let row = await this.table().select('*').where({ id }).first()
    if (!row) {
      throw new HttpError('Todo Item not found, id: ' + id, 404)
    }
    return row as TodoItem
  }

  async update(id: number, todo: Partial<TodoItem>) {
    await this.table().update(todo).where({ id })
  }

  async incCount(id: number) {
    await this.table()
      .update({ count: this.knex.raw('count + 1') })
      .where({ id })
  }
}
