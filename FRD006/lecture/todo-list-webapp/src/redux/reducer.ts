import { createRouterReducer } from '@lagunovsky/redux-react-router'
import { combineReducers } from 'redux'
import { RootState } from './state'
import { history } from './history';
import { themeReducer } from './theme/reducer'
import { todoListReducer } from './todo-list/reducer'

export const rootReducer = combineReducers<RootState>({
  todoList: todoListReducer,
  theme: themeReducer,
  router: createRouterReducer(history)
})
