import { combineReducers } from 'redux'
import { imageReducer } from './image/reducer'

export const rootReducer = combineReducers({
  image: imageReducer,
})
