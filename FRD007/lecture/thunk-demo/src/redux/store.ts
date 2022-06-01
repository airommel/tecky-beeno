import { createStore } from 'redux'
import { rootEnhancer } from './enhancer'
import { rootReducer } from './reducer'

export const store = createStore(rootReducer, rootEnhancer)

// store.dispatch({ type: '@@Clock/setClockTime', now: Date.now() })
// store.getState()
