import { TodoListActionType } from './action'
import { TodoDetail, TodoListState } from './state'

const initialState: TodoListState = {
  items: [
    {
      id: 1,
      title: 'buy apple',
      desc: 'one day one apple, doctor away from me',
      count: 1,
    },
    {
      id: 2,
      title: 'buy banana',
      desc: 'banana is good for coding monkey',
      count: 5,
    },
  ],
  selectedItemId: 2,
}

export const todoListReducer = (
  state: TodoListState = initialState,
  action: TodoListActionType,
): TodoListState => {
  switch (action.type) {
    case '@@TodoList/selectItem':
      return { ...state, selectedItemId: action.itemId }
    case '@@TodoList/tickItem': {
      let newItems = state.items.map((item): TodoDetail => {
        if (item.id === action.itemId) {
          return {
            ...item,
            count: item.count + 1,
          }
        }
        return item
      })
      return { ...state, items: newItems }
    }
    default:
      return state
  }
}
