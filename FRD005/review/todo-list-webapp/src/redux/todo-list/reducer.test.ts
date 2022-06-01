import { addItemAction, renameItemAction } from './action'
import { todoListReducer_logic } from './reducer'
import { TodoListState } from './state'

describe('todo-list reducer TestSuit', () => {
  test('should return initial state upon unknown action', () => {
    let initialState: TodoListState = {
      items: [],
      selectedItemId: null,
    }
    let newState = todoListReducer_logic(initialState, {
      type: '@@INIT',
    } as any)
    expect(newState).toEqual(initialState)
  })
  test('should add new item to the tail', () => {
    let initialState: TodoListState = {
      items: [
        { id: 1, title: '', desc: '', count: 0 },
        { id: 2, title: '', desc: '', count: 0 },
      ],
      selectedItemId: null,
    }
    let newState = todoListReducer_logic(
      initialState,
      addItemAction({ title: 'mock title', desc: 'mock desc' }),
    )
    expect(newState).not.toEqual(initialState)
    expect(newState.items).toHaveLength(3)
    expect(newState.items[2].id).toBe(3)
    expect(newState.items[2].title).toBe('mock title')
    expect(newState.items[2].desc).toBe('mock desc')
  })
  test('should rename item and preserve order', () => {
    let initialState: TodoListState = {
      items: [
        { id: 1, title: '', desc: '', count: 0 },
        { id: 2, title: 'mock title', desc: '', count: 0 },
        { id: 3, title: '', desc: '', count: 0 },
      ],
      selectedItemId: null,
    }
    let newState = todoListReducer_logic(
      initialState,
      renameItemAction(2, 'new mock title'),
    )
    expect(newState).not.toEqual(initialState)
    expect(newState.items).toHaveLength(3)
    expect(newState.items[1].id).toBe(2)
    expect(newState.items[1].title).toBe('new mock title')
  })
})
