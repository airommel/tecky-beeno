import { TodoListActionType } from './action'
import { TodoState, TodoListState } from './state'

const StorageKey = 'todo-list'

const loadState = (): TodoListState => {
  let text = localStorage.getItem(StorageKey)
  if (!text) {
    return {
      items: [
        {
          id: 1,
          title: 'buy apple',
          desc: 'one day one apple, doctor away from me',
          count: 1,
          order: 1,
        },
        {
          id: 2,
          title: 'buy banana',
          desc: 'banana is good for coding monkey',
          count: 5,
          order: 2,
        },
      ],
      selectedItemId: 2,
    }
  }
  let state: TodoListState = JSON.parse(text)
  state.items.forEach((item, idx) => {
    if (!item.order) {
      item.order = idx + 1
    }
  })
  return state
}
const saveState = (state: TodoListState) => {
  let text = JSON.stringify(state)
  localStorage.setItem(StorageKey, text)
}

function updateItem(
  items: TodoState[],
  id: number,
  updater: (item: TodoState) => Partial<TodoState>,
): TodoState[] {
  let newItems = items.map((item): TodoState => {
    if (item.id === id) {
      let patch = updater(item)
      return {
        ...item,
        ...patch,
      }
    }
    return item
  })
  return newItems
}

export const todoListReducer_logic = (
  state: TodoListState = loadState(),
  action: TodoListActionType,
): TodoListState => {
  switch (action.type) {
    case '@@TodoList/selectItem':
      return { ...state, selectedItemId: action.itemId }
    case '@@TodoList/reorderItem':
      return {
        ...state,
        items: updateItem(state.items, action.itemId, item => ({
          order: action.order,
        }))
          // .slice()
          // .sort((a, b) => a.order - b.order)
          // .map((item, idx) => {
          //   return { ...item, order: idx + 1 }
          // }),
      }
    case '@@TodoList/tickItem':
      return {
        ...state,
        items: updateItem(state.items, action.itemId, item => ({
          count: item.count + 1,
        })),
      }
    case '@@TodoList/renameItem':
      return {
        ...state,
        items: updateItem(state.items, action.itemId, item => ({
          title: action.title,
        })),
      }
    case '@@TodoList/updateItemDesc':
      return {
        ...state,
        items: updateItem(state.items, action.itemId, item => ({
          desc: action.desc,
        })),
      }
    case '@@TodoList/addItem': {
      let maxId = Math.max(0, ...state.items.map(item => item.id))
      let maxOrder = Math.max(1, ...state.items.map(item => item.order))
      let newId = maxId + 1
      let newItem: TodoState = {
        id: newId,
        ...action.newItem,
        count: 0,
        order: maxOrder + 1,
      }
      return {
        items: [...state.items, newItem],
        selectedItemId: newId,
      }
    }
    default:
      return state
  }
}

export const todoListReducer = (
  state: TodoListState = loadState(),
  action: TodoListActionType,
): TodoListState => {
  let newState = todoListReducer_logic(state, action)
  if (newState !== state) {
    saveState(newState)
  }
  return newState
}
