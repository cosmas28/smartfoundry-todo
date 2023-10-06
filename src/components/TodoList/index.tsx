import React from 'react'
import './index.scss'
import { TodoItem } from '../../components'
import { useTodo } from '../../context/TodoProvider'

const TodoList: React.FC = () => {
	const { todos, loading } = useTodo()

	return (
		<ul>
			{todos?.map((todo) => (
				<li key={todo.id}>
					<TodoItem todo={todo} />
				</li>
			))}
			{loading && <div className='loading'><p>Loading...</p></div>}
		</ul>
	)
}

export default TodoList
