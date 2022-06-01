export namespace api {
  export type NewTodoItemDTO = {
    title: string
    desc: string
  }

  export type TodoItem = {
    id: number
    is_done: 1 | 0
    count: number
  } & NewTodoItemDTO
}
