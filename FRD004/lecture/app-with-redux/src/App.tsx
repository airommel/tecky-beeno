import React from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { TodoDetail } from './components/TodoDetail'
import { TopBar } from './components/TopBar'

function App() {
  return (
    <div className="App">
      <TopBar></TopBar>
      <TodoList></TodoList>
      <TodoDetail></TodoDetail>
    </div>
  )
}

export default App
