import { Navigate } from 'react-router-dom'
import { unProxy, useStateProxy } from 'use-state-proxy'
import { post } from '../api'
import { useGet } from '../hooks/use-get'
import { useSocket } from '../hooks/use-socket'
import { useToken } from '../hooks/use-token'
import { routes } from '../routes'

export function LobbyPage() {
  const { token, setToken } = useToken()
  let state = useStateProxy({
    name: '',
    error: '',
  })
  const roomList = useGet('/room', {
    error: '',
    roomList: [] as {
      id: number
      name: string
      username: string
    }[],
  })
  useSocket(socket => {
    socket.emit('join', 'lobby')
    socket.on('new-room', room => {
      roomList.setState(json => {
        return { ...json, roomList: [room, ...(json.roomList || [])] }
      })
    })
  })
  async function createRoom() {
    let json = await post('/room', { name: state.name }, token)
    state.error = json.error
    if (!json.error) {
      state.name = ''
    }
  }
  function logout() {
    setToken('')
  }
  if (!token) {
    return <Navigate to={routes.welcome} />
  }
  return (
    <div className="p-3">
      <h1>Lobby</h1>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="p-1">
        <label>
          new room name:{' '}
          <input
            type="text"
            value={state.name}
            onChange={e => (state.name = e.currentTarget.value)}
          />
        </label>
        <button className="m-1" onClick={createRoom}>
          create
        </button>
        {state.error ? <p className="text-error">{state.error}</p> : null}
      </div>
      <h2>Room List</h2>
      <div>
        {roomList.render(json => (
          <>
            {json.roomList.length == 0 ? (
              <p>no room created yet</p>
            ) : (
              json.roomList.map(room => (
                <div key={room.id}>
                  #{room.id} [{room.name}] by {room.username}
                </div>
              ))
            )}
          </>
        ))}
      </div>
    </div>
  )
}
