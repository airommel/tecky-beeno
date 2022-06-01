import express from 'express'
import { wrapControllerMethod } from './helpers'
import { HttpError } from './http-error'
import { NewTodoItemDTO, TodoItem } from './models'
import { TodoService } from './todo-service'

export class TodoController {
  router = express.Router()

  constructor(private todoService: TodoService) {
    this.router.get('/todo/:id', wrapControllerMethod(this.get))
    this.router.patch('/todo/:id/title', wrapControllerMethod(this.updateTitle))
    this.router.patch('/todo/:id/desc', wrapControllerMethod(this.updateDesc))
    this.router.post('/todo/:id/tick', wrapControllerMethod(this.tickOnce))
    this.router.post('/todo/:id/done', wrapControllerMethod(this.markDone))
    this.router.delete('/todo/:id/done', wrapControllerMethod(this.unMarkDone))
    this.router.get('/todo', wrapControllerMethod(this.list))
    this.router.post('/todo', wrapControllerMethod(this.create))
  }

  create = async (req: express.Request) => {
    let { title, desc } = req.body
    if (!title) throw new HttpError('missing title in request body', 400)
    if (!desc) throw new HttpError('missing desc in request body', 400)
    let todo: NewTodoItemDTO = {
      title,
      desc,
    }
    let id = await this.todoService.create(todo)
    return id
  }

  list = async (req: express.Request) => {
    let list = await this.todoService.list()
    return list
  }

  get = async (req: express.Request) => {
    let id = +req.params.id
    if (!id) {
      throw new HttpError('expect numeric req.params.id', 400)
    }
    let todo = await this.todoService.get(id)
    return todo
  }

  updateTitle = async (req: express.Request) => {
    let id = +req.params.id
    if (!id) {
      throw new HttpError('expect numeric req.params.id', 400)
    }
    let { title } = req.body
    if (!title) throw new HttpError('missing title in request body', 400)
    await this.todoService.update(id, { title })
    return { ok: true }
  }

  updateDesc = async (req: express.Request) => {
    let id = +req.params.id
    if (!id) {
      throw new HttpError('expect numeric req.params.id', 400)
    }
    let { desc } = req.body
    if (!desc) throw new HttpError('missing desc in request body', 400)
    await this.todoService.update(id, { desc })
    return { ok: true }
  }

  tickOnce = async (req: express.Request) => {
    let id = +req.params.id
    if (!id) {
      throw new HttpError('expect numeric req.params.id', 400)
    }
    await this.todoService.incCount(id)
    return { ok: true }
  }

  unMarkDone = async (req: express.Request) => {
    let id = +req.params.id
    if (!id) {
      throw new HttpError('expect numeric req.params.id', 400)
    }
    await this.todoService.update(id, { is_done: 0 })
    return { ok: true }
  }

  markDone = async (req: express.Request) => {
    let id = +req.params.id
    if (!id) {
      throw new HttpError('expect numeric req.params.id', 400)
    }
    await this.todoService.update(id, { is_done: 1 })
    return { ok: true }
  }
}
