import React, { useContext, createContext, ReactElement, FC, useState, useEffect} from 'react'
import { Todo, Action } from '../../types'

export const BASE_URL = 'http://localhost:5173'

type Props = {
	todos: Todo[]
	dispatch: (action: Action) => void
	loading: boolean
	addTodoItem: (title: string) => void
	setAllTodos: (todos: Todo[]) => void
}

const TodoContext = createContext<Partial<Props>>({})

export const useTodo = () => useContext(TodoContext)

export const TodoProvider: FC<{children: ReactElement}> = ({children}) => {
	const [todos, setAllTodos] = useState<Todo[]>([])
	const [loading, setLoading] = useState(false)

	
	useEffect(() => {
		setLoading(true)
		fetch(`${BASE_URL}/api/todos`)
    .then(async(res) => {
      const fetchedTodos = await res.json()
      setAllTodos(fetchedTodos.todos)
      setLoading(false)
    })
	}, [])

	const addTodoItem = (title: string) => {
		fetch(`${BASE_URL}/api/todos`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title }),
      cache: 'default'
    })
		.then(async(res) => {
			const jsonRes = await res.json()
			setAllTodos([...todos, jsonRes.todo])
		})
	}

	return (
		<TodoContext.Provider value={
			{
				todos,
				loading,
				addTodoItem,
				setAllTodos
			}
		}>
			{children}
		</TodoContext.Provider>
	)
}
