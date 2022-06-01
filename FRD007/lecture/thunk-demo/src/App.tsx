import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { DigitalClock } from './component/DigitalClock'
import { AnalogClock } from './component/AnalogClock'
import { ClockProvider } from './redux/clock/provider'
import { IPFSExplorer } from './component/IPFSExplorer'

function App() {
  return (
    <Provider store={store}>
      <ClockProvider>
        <div className="App">
          <header className="App-header">
            <DigitalClock />
            <AnalogClock />
            <IPFSExplorer />
          </header>
        </div>
      </ClockProvider>
    </Provider>
  )
}

export default App
