import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const rootEnhancer = composeEnhancers(
  applyMiddleware(logger),
  applyMiddleware(thunk),
)
