import { createStore } from 'redux'
import { RootAction } from './action'
import { rootEnhancer } from './enhancer'
import { rootReducer } from './reducer'
import { RootState } from './state'

export const store = createStore<RootState, RootAction, any, any>(
  rootReducer,
  rootEnhancer,
)

// store.getState
// store.subscribe
// store.dispatch
