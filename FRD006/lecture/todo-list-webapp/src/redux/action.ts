import { RouterActions } from '@lagunovsky/redux-react-router'
import { ThemeActionType } from './theme/action'
import { TodoListActionType } from './todo-list/action'

export type ActionType = TodoListActionType | ThemeActionType | RouterActions
