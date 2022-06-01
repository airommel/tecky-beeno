export function tickItemAction(id: number) {
  return {
    type: '@@TodoList/tickItem' as const,
    itemId: id,
  }
}

export function selectItemAction(id: number) {
  return {
    type: '@@TodoList/selectItem' as const,
    itemId: id,
  }
}

export type TodoListActionType =
  | ReturnType<typeof tickItemAction>
  | ReturnType<typeof selectItemAction>

