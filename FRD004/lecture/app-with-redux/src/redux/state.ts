export type RootState = {
  list: TodoList
  selectedItemId: number | null
}

export type TodoList = TodoDetail[]

export type TodoDetail = {
  id: number
  title: string
  desc: string
  count: number
}
