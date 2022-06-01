import { knex } from './db'
import { TodoService } from './todo-service'
import { UserService } from './user-service'

export let todoService = new TodoService(knex)
export let userService = new UserService(knex)
