import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

export const rootEnhancer = compose(applyMiddleware(thunk))
