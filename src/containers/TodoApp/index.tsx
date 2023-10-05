import React from 'react'
import './index.scss'
import { TodoItem, AddTodo } from '../../components'
import { useTodo } from '../../context/TodoProvider'

const TodoApp = () => {
	const { todos, loading } = useTodo()

	return (
		<div className='todos'>
			<div className='todos__section--left'>
				<AddTodo/>
				{todos?.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
				{loading && <div className='loading'><p>Loading...</p></div>}
			</div>
			<div className='todos__section--right'>
			</div>
		</div>
	)
}

export default TodoApp
