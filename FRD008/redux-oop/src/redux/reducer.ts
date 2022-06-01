import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { Auth } from './auth-oop/state'
import { RootState } from './state'

export let reduxObjects = {
  auth: new Auth(),
}
export let reduxObjectsProxy = new Proxy(reduxObjects, {
  get(target, name) {
    let object = target[name as keyof typeof reduxObjects]
    return object.mount()
  },
})

export const rootReducer = combineReducers<RootState, any>({
  auth: authReducer,
  authObject: reduxObjects.auth.reducer,
})
