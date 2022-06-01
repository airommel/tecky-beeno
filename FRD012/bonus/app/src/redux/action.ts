import { Dispatch } from 'redux'
import { ImageAction } from './image/action'

export type AppAction = ImageAction

export type AppDispatch = Dispatch<AppAction>
