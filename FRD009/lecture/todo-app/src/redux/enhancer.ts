import { applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export let rootEnhancer = composeEnhancer(
  applyMiddleware(logger),
  applyMiddleware(thunk),
  applyMiddleware(logger),
)
