import { ReduxRouterState } from '@lagunovsky/redux-react-router'
import { ThemeState } from './theme/state'
import { TodoListState } from './todo-list/state'

export type RootState = {
  todoList: TodoListState
  theme: ThemeState
  router: ReduxRouterState
}
