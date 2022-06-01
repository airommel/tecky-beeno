import { Dispatch } from 'redux'
import { ThemeActionType } from './theme/action'
import { TodoListActionType } from './todo-list/action'

export type RootAction = TodoListActionType | ThemeActionType

export type RootDispatch = Dispatch<RootAction>
