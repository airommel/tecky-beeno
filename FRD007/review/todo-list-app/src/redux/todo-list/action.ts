import { TodoState } from './state'

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

export function downloadingTodoListAction(id: number) {
  return {
    type: '@@TodoList/downloadingTodoList' as const,
    id,
  }
}

export function downloadingItemAction(id: number) {
  return {
    type: '@@TodoList/downloadingItem' as const,
    id,
  }
}

export function addItemAction(newItem: TodoState) {
  return {
    type: '@@TodoList/addItem' as const,
    newItem,
  }
}

export function gotAllTodoItemsAction(items: TodoState[]) {
  return {
    type: '@@TodoList/gotAllTodoItems' as const,
    items,
  }
}

export function renameItemAction(id: number, title: string) {
  return { type: '@@TodoList/renameItem' as const, itemId: id, title }
}
export function updateItemDescAction(id: number, desc: string) {
  return { type: '@@TodoList/updateItemDesc' as const, itemId: id, desc }
}

export function reorderItemAction(id: number, order: number) {
  return { type: '@@TodoList/reorderItem' as const, itemId: id, order }
}

export function todoAPIFailedAction(action: string, error: string) {
  return { type: '@@TodoList/apiFailed' as const, action, error }
}

export type TodoListActionType =
  | ReturnType<typeof tickItemAction>
  | ReturnType<typeof selectItemAction>
  | ReturnType<typeof downloadingItemAction>
  | ReturnType<typeof downloadingTodoListAction>
  | ReturnType<typeof addItemAction>
  | ReturnType<typeof gotAllTodoItemsAction>
  | ReturnType<typeof renameItemAction>
  | ReturnType<typeof updateItemDescAction>
  | ReturnType<typeof reorderItemAction>
  | ReturnType<typeof todoAPIFailedAction>
