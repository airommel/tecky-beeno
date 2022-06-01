import express from 'express'
import { knex } from './db'
import { env } from './env'
import { TodoController } from './todo-controller'
import { TodoService } from './todo-service'
import { print } from 'listening-on'
import cors from 'cors'

let app = express()

app.use(cors())
app.use(express.json())

let todoService = new TodoService(knex)

let todoController = new TodoController(todoService)

app.use(todoController.router)

app.listen(env.PORT, () => {
  print(env.PORT)
})
