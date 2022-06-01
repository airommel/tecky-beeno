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

export type NewItemDTO = {
  title: string
  desc: string
}

export function addItemAction(newItem: NewItemDTO) {
  return {
    type: '@@TodoList/addItem' as const,
    newItem,
  }
}

export function renameItemAction(id: number, title: string) {
  return { type: '@@TodoList/renameItem' as const, itemId: id, title }
}
export function updateItemDescAction(id: number, desc: string) {
  return { type: '@@TodoList/updateItemDesc' as const, itemId: id, desc }
}

export function reorderItemAction(id:number,order:number) {
  return { type: '@@TodoList/reorderItem' as const, itemId: id, order }
}

export type TodoListActionType =
  | ReturnType<typeof tickItemAction>
  | ReturnType<typeof selectItemAction>
  | ReturnType<typeof addItemAction>
  | ReturnType<typeof renameItemAction>
  | ReturnType<typeof updateItemDescAction>
  | ReturnType<typeof reorderItemAction>
