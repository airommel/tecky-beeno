import { RootDispatch } from '../action'
import { callAPI } from '../api'
import {
  addItemAction,
  gotAllTodoItemsAction,
  todoAPIFailedAction,
} from './action'
import { api } from './api'
import { TodoState } from './state'

export function getAllTodoItemsThunk() {
  return async (dispatch: RootDispatch) => {
    let result = await callAPI<api.TodoItem[]>('GET', '/todo')
    if ('error' in result) {
      dispatch(todoAPIFailedAction('load todo list', result.error))
    } else {
      let items: TodoState[] = result.map(item => {
        return {
          ...item,
          order: item.id,
        }
      })
      dispatch(gotAllTodoItemsAction(items))
    }
  }
}

export function getTodoItemByIdThunk(id: number) {
  return async (dispatch: RootDispatch) => {
    let result = await callAPI<api.TodoItem>('GET', '/todo/' + id)
    if ('error' in result) {
      dispatch(todoAPIFailedAction('load todo list', result.error))
    } else {
      let newItem: TodoState = {
        ...result,
        order: result.id,
      }
      dispatch(addItemAction(newItem))
    }
  }
}
