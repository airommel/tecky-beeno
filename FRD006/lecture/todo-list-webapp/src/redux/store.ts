import { createStore, applyMiddleware, compose } from 'redux'
import { ActionType } from './action'
import { rootReducer } from './reducer'
import { RootState } from './state'
import logger from 'redux-logger';
import {createRouterMiddleware} from '@lagunovsky/redux-react-router'
import { history } from './history'

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}


const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore<RootState, ActionType, any, any>(
  rootReducer,
  enhancer(
    applyMiddleware(logger),
    applyMiddleware(createRouterMiddleware(history))
  )
)

// store.getState
// store.subscribe
// store.dispatch
