export namespace SharedState {
  export type TodoList = TodoDetail[]

  export type TodoDetail = {
    id: number
    title: string
    desc: string
    count: number
  }
}
