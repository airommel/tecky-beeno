import { combineReducers } from 'redux'
import { ActionType } from './action'
import { RootState } from './state'
import { themeReducer } from './theme/reducer'
import { todoListReducer } from './todo-list/reducer'

export const rootReducer = combineReducers<RootState>({
  todoList: todoListReducer,
  theme: themeReducer,
})
