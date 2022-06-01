import React from 'react'
import logo from './logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { ClassCounter } from './components/ClassCounter'
import { FCCounter } from './components/FCCounter'
import { FCLCounter } from './components/FCLCounter'
import { FormDemo } from './components/FormDemo'
import { UseFormDemo } from './components/UseFormDemo';

class App extends React.Component {
  state = {
    showAlice: false,
    showBob: false,
    showCharlie: false,
  }

  toggle(key: keyof typeof this.state) {
    let value = this.state[key]
    this.setState({ [key]: !value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UseFormDemo />
          <div style={{ height: '5em' }}></div>
          <FormDemo />
          <div style={{ height: '5em' }}></div>
          <button onClick={() => this.toggle('showAlice')}>toggle Alice</button>
          <button onClick={() => this.toggle('showBob')}>toggle Bob</button>
          <button onClick={() => this.toggle('showCharlie')}>
            toggle Charlie
          </button>
          {this.state.showAlice ? <ClassCounter name="Alice" /> : null}
          {this.state.showBob ? <FCCounter name="Bob" /> : null}
          {this.state.showCharlie ? <FCLCounter name="Charlie" /> : null}
        </header>
      </div>
    )
  }
}

export default App
