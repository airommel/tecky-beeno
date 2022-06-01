import { Navigate, useRoutes } from 'react-router-dom'
import { unProxy, useStateProxy } from 'use-state-proxy'
import { post } from '../api'
import { useToken } from '../hooks/use-token'
import { routes } from '../routes'

export function WelcomePage() {
  let state = useStateProxy({
    username: '',
    password: '',
    error: '',
  })
  let { token, setToken } = useToken()
  if (token) {
    return <Navigate to={routes.lobby} />
  }
  function getUser() {
    let { error, ...user } = unProxy(state)
    return user
  }
  async function login() {
    let json = await post('/user/login', getUser())
    state.error = json.error
    if (json.token) {
      setToken(json.token)
    }
  }
  async function register() {
    let json = await post('/user/register', getUser())
    state.error = json.error
    if (json.token) {
      setToken(json.token)
    }
  }
  return (
    <div className="p-3">
      <h1>Welcome Page</h1>
      <div className="p-1">
        <label>
          username:{' '}
          <input
            type="text"
            value={state.username}
            onChange={e => (state.username = e.currentTarget.value)}
          />
        </label>
      </div>
      <div className="p-1">
        <label>
          password:{' '}
          <input
            type="password"
            value={state.password}
            onChange={e => (state.password = e.currentTarget.value)}
          />
        </label>
      </div>
      {state.error ? <p className="text-error">{state.error}</p> : null}
      <div className="p-1">
        <button className="m-1" onClick={login}>
          Login
        </button>
        <button className="m-1" onClick={register}>
          Register
        </button>
      </div>
    </div>
  )
}
