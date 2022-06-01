import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const rootEnhancer = composer(
  applyMiddleware(logger),
  applyMiddleware(thunk),
  applyMiddleware(logger),
)
