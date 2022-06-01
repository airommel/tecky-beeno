import { Knex } from 'knex'
import { NewTodoItemDTO } from '../models'
import { TodoService } from '../todo-service'

export async function seed(knex: Knex): Promise<void> {
  let todoService = new TodoService(knex)
  let list = await todoService.list()
  let sampleList: NewTodoItemDTO[] = [
    { title: 'Buy apple', desc: 'One day one apple, doctor stay away from me' },
    { title: 'Buy banana', desc: "The best reward to coding monkey's brain" },
    { title: 'Buy cherry', desc: 'The healthy sweet' },
  ]
  for (let todo of sampleList) {
    if (!list.find(item => item.title === todo.title)) {
      await todoService.create(todo)
    }
  }
}
