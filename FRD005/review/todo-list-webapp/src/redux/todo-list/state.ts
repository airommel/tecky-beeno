export type TodoListState = {
  items: TodoList
  selectedItemId: number | null
}

export type TodoList = TodoState[]

export type TodoState = {
  id: number
  title: string
  desc: string
  count: number
}
