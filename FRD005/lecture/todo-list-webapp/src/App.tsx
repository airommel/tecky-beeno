import React from 'react'
import styles from './App.module.css'
import { TodoList } from './components/TodoList'
import { TodoDetail } from './components/TodoDetail'
// import { TopBar } from './components/TopBar'
import TopBar from './components/TopBarClass'
import { RootState } from './redux/state'
import { useSelector } from 'react-redux'

function App() {
  const themeStyles = useSelector((state: RootState) => state.theme.styles)
  return (
    <div
      className={styles.App}
      style={{
        color: themeStyles.textColor,
        backgroundColor: themeStyles.backgroundColor,
      }}
    >
      <TopBar></TopBar>
      <TodoList></TodoList>
      <TodoDetail></TodoDetail>
    </div>
  )
}

export default App
