import React, { useState } from 'react'
import styles from './App.module.css'
import { TodoList } from './components/TodoList'
import { TodoDetail } from './components/TodoDetail'
// import { TopBar } from './components/TopBar'
import TopBar from './components/TopBarClass'
import { RootState } from './redux/state'
import { useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { NoMatch } from './components/NoMatch'

function App() {
  const themeStyles = useSelector((state: RootState) => state.theme.styles)

  // An lazy implementation of React Router
  // const [tab, setTab] = useState<'/'|'/todo'|'/todo-detail'>('/')

  // 4 pages
  // 1. Landing page Todo- introduction
  // 2. Todo list main list
  // 3. Todo list detail (id as a params)
  // 4. About us
  return (
    <div
      className={styles.App}
      style={{
        color: themeStyles.textColor,
        backgroundColor: themeStyles.backgroundColor,
      }}
    >
      {/* {
        tab === "/" && <TodoList/>
      } */}
      <TopBar/>
      <ul>
        <Link to='/abcdefgh' >Todo</Link>
        &nbsp;
      </ul>
      <Routes>
        <Route path="/" element={<TodoList/>}/>
        <Route path="/todo-detail/:id" element={<TodoDetail/>}/>
        <Route path="/*" element={<NoMatch />} />
      </Routes>
    </div>
  )
}

export default App
