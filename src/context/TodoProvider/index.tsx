import React, { useContext, createContext, ReactElement, FC, useState, useEffect} from 'react'
import { Todo } from '../../types'

export const BASE_URL = 'http://localhost:5173'

type Props = {
	todos: Todo[]
	loading: boolean
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

	return (
		<TodoContext.Provider value={
			{
				todos,
				loading,
				setAllTodos
			}
		}>
			{children}
		</TodoContext.Provider>
	)
}
