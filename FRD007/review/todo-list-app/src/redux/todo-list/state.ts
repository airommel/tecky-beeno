export type TodoListState = {
  list: TodoList
  record: Record<number, 'loading' | TodoState>
  // selectedItemId: number | null
  failMessage: null | {
    action: string
    error: string
  }
}

export type TodoList = null | 'loading' | Array<TodoState>

export type TodoState = {
  id: number
  title: string
  desc: string
  count: number
  order: number
}
