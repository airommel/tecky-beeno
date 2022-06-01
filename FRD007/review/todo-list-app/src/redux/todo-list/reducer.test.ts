import { addItemAction, renameItemAction } from './action'
import { todoListReducer_logic } from './reducer'
import { TodoListState } from './state'

describe('todo-list reducer TestSuit', () => {
  test('should return initial state upon unknown action', () => {
    let initialState: TodoListState = {
      list: [],
      record: {},
      // selectedItemId: null,
      failMessage: null,
    }
    let newState = todoListReducer_logic(initialState, {
      type: '@@INIT',
    } as any)
    expect(newState).toEqual(initialState)
  })
  test('should add new item to the tail', () => {
    let initialState: TodoListState = {
      list: [
        { id: 1, title: '', desc: '', count: 0, order: 1 },
        { id: 2, title: '', desc: '', count: 0, order: 2 },
      ],
      record: {},
      // selectedItemId: null,
      failMessage: null,
    }
    let newState = todoListReducer_logic(
      initialState,
      addItemAction({
        title: 'mock title',
        desc: 'mock desc',
        id: 3,
        count: 0,
        order: 3,
      }),
    )
    expect(newState).not.toEqual(initialState)
    if (!Array.isArray(newState.list)) {
      throw new Error('unexpected state, the mocked items should be an array')
    }
    expect(newState.list).toHaveLength(3)
    expect(newState.list[2].id).toBe(3)
    expect(newState.list[2].title).toBe('mock title')
    expect(newState.list[2].desc).toBe('mock desc')
  })
  test('should rename item and preserve order', () => {
    let initialState: TodoListState = {
      list: [
        { id: 1, title: '', desc: '', count: 0, order: 1 },
        { id: 2, title: 'mock title', desc: '', count: 0, order: 2 },
        { id: 3, title: '', desc: '', count: 0, order: 3 },
      ],
      record: {},
      // selectedItemId: null,
      failMessage: null,
    }
    let newState = todoListReducer_logic(
      initialState,
      renameItemAction(2, 'new mock title'),
    )
    expect(newState).not.toEqual(initialState)
    if (!Array.isArray(newState.list)) {
      throw new Error('unexpected state, the mocked items should be an array')
    }
    expect(newState.list).toHaveLength(3)
    expect(newState.list[1].id).toBe(2)
    expect(newState.list[1].title).toBe('new mock title')
  })
})
