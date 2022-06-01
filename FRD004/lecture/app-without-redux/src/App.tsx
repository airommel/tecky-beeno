import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { TodoList } from './components/TodoList'
import { TodoDetail } from './components/TodoDetail'
import { SharedState } from './shared/state'
import { TopBar } from './components/TopBar'

function App() {
  const [selectedItemId, setSelectedItemId] = useState<null | number>(null)
  const [list, setList] = useState<SharedState.TodoList>([
    {
      id: 1,
      title: 'buy apple',
      desc: 'one day one apple, doctor away from me',
      count: 1,
    },
    {
      id: 2,
      title: 'buy banana',
      desc: 'banana is good for coding monkey',
      count: 2,
    },
  ])

  const totalCount = list.reduce((sum, item) => sum + item.count, 0)
  const itemCount = list.length

  function renderItemDetail() {
    const selectedItem = list.find(item => item.id === selectedItemId)
    if (!selectedItem) {
      return null
    }
    const tickItem = () => {
      const newList = list.map(item => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            count: item.count + 1,
          }
        }
        return item
      })
      setList(newList)
    }
    return <TodoDetail item={selectedItem} tickItem={tickItem}></TodoDetail>
  }

  return (
    <div className="App">
      <TopBar totalCount={totalCount} itemCount={itemCount}></TopBar>
      <TodoList list={list} selectItem={setSelectedItemId}></TodoList>
      {renderItemDetail()}
    </div>
  )
}

export default App
