import { Route, Routes } from 'react-router-dom'
import { LobbyPage } from './pages/Lobby'
import { WelcomePage } from './pages/Welcome'

export let routes = {
  welcome: '/',
  lobby: '/lobby',
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.welcome} element={<WelcomePage />} />
      <Route path={routes.lobby} element={<LobbyPage />} />
    </Routes>
  )
}
