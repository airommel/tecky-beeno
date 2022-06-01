export type RootState = {
  list: TodoState[]
}

export type TodoState = {
  id: number
  title: string
  date: string
  is_done: boolean
}
