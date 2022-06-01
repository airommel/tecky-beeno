import { createStore } from 'redux'
import { rootEnhancer } from './enhancer'
import { rootReducer } from './reducer'

export let store = createStore(rootReducer, rootEnhancer)
