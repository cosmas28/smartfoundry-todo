import React, { useState, useEffect } from 'react'
import './index.scss'
import { Todo } from '../../types'

const BASE_URL = 'http://localhost:5173'

const TodoApp = () => {
	const [todos, setTodos] = useState<Todo[]>()
	const [loading, setLoading] = useState(false)
	
	useEffect(() => {
		setLoading(true)
		fetch(`${BASE_URL}/api/todos`)
    .then(async(res) => {
      const allTodos = await res.json()
      setTodos(allTodos.todos)
      setLoading(false)
    })
	}, [])

	return (
		<div className='todos'>
			<div className='todos__section--left'>
				{todos?.map((todo) => (
					<div className='todo' key={todo.id}>
						<p>{todo.title}</p>
					</div>
				))}
				{loading && <div className='loading'><p>Loading...</p></div>}
			</div>
			<div className='todos__section--right'>
			</div>
		</div>
	)
}

export default TodoApp
