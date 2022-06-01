import { TodoListActionType } from './action'
import { TodoState, TodoListState } from './state'

const StorageKey = 'todo-list'

const loadState = (): TodoListState => {
  return {
    list: 'loading',
    record: {},
    // selectedItemId: null,
    failMessage: null,
  }
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
    case '@@TodoList/gotAllTodoItems':
      return {
        ...state,
        list: action.items,
      }
    case '@@TodoList/apiFailed': {
      return { ...state, failMessage: action }
    }
    case '@@TodoList/downloadingTodoList': {
      return {
        ...state,
        list: 'loading',
        failMessage: null,
      }
    }
    case '@@TodoList/downloadingItem': {
      return {
        ...state,
        record: {
          ...state.record,
          [action.id]: 'loading',
        },
        // selectedItemId: newId,
        failMessage: null,
      }
    }
    case '@@TodoList/addItem': {
      return {
        list:
          state.list === 'loading' || !state.list
            ? state.list
            : [...state.list, action.newItem],
        record: {
          ...state.record,
          [action.newItem.id]: action.newItem,
        },
        // selectedItemId: newId,
        failMessage: null,
      }
    }
  }
  if (state.list === 'loading' || !state.list) {
    return state
  }
  switch (action.type) {
    // case '@@TodoList/selectItem':
    //   return { ...state, selectedItemId: action.itemId }
    case '@@TodoList/reorderItem':
      return {
        ...state,
        failMessage: null,
        list: updateItem(state.list, action.itemId, item => ({
          order: action.order,
        })),
      }
    case '@@TodoList/tickItem':
      return {
        ...state,
        failMessage: null,
        list: updateItem(state.list, action.itemId, item => ({
          count: item.count + 1,
        })),
      }
    case '@@TodoList/renameItem':
      return {
        ...state,
        failMessage: null,
        list: updateItem(state.list, action.itemId, item => ({
          title: action.title,
        })),
      }
    case '@@TodoList/updateItemDesc':
      return {
        ...state,
        failMessage: null,
        list: updateItem(state.list, action.itemId, item => ({
          desc: action.desc,
        })),
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
