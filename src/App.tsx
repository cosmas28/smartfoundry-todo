import * as React from 'react'
import './App.scss'
import TodoApp from './containers/TodoApp'
import { TodoProvider } from './context/TodoProvider'

function App() {
  return (
    <TodoProvider><TodoApp /></TodoProvider>
  )
}

export default App
