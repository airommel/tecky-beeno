import { createStore } from 'redux'
import { ActionType } from './action'
import { rootReducer } from './reducer'
import { RootState } from './state'

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore<RootState, ActionType, any, any>(
  rootReducer,
  enhancer,
)

// store.getState
// store.subscribe
// store.dispatch
