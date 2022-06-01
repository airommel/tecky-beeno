import express from 'express'
import { env } from './env'
import { TodoController } from './todo-controller'
import { print } from 'listening-on'
import cors from 'cors'
import { todoService, userService } from './services'
import { UserController } from './user-controller'

let app = express()

app.use(cors())
app.use(express.json())

let todoController = new TodoController(todoService)
let userController = new UserController(userService)

app.use(todoController.router)
app.use(userController.router)

app.listen(env.PORT, () => {
  print(env.PORT)
})
