import {  compose, createStore } from 'redux'
import { ActionType } from './action'
import { rootReducer } from './reducer'
import { RootState } from './state'

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}
// boilerplate
const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore<RootState, ActionType, any, any>(
  rootReducer,
  enhancer(),
)

// store.getState
// store.subscribe
// store.dispatch
