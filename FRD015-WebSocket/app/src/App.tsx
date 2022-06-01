import './App.css'
import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

function App() {
  return (
    <>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </>
  )
}

export default App
