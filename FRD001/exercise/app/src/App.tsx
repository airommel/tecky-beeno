import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div>
      <header>
        <h1>Simple Website</h1>
      </header>
      <section>
        This is a simple website made without React. Try to convert this into
        React enabled.
        <ol>
          <li>
            First, you need to use{' '}
            <span className="command">create-react-app</span>
          </li>
          <li>
            Second, you need to run <span className="command">npm start</span>
          </li>
        </ol>
      </section>
      <footer>
        <img src="./logo.png" />
      </footer>
    </div>
  )
}

export default App
