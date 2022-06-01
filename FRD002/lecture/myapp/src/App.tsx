import React from 'react'
import logo from './logo.svg'

import 'bootstrap/dist/css/bootstrap.css'
// import './Theme.scss'

import './App.css'
import { TodoList } from './components/TodoList'

function App() {
  return (
    <div className='container'>
      <TodoList></TodoList>
    </div>
  )
}

export default App
