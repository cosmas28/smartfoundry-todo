import React, { FC, useState, FormEvent } from 'react'
import { useTodo } from '../../context/TodoProvider'
import './index.scss'

const AddTodo: FC = () => {
	const { addTodoItem } = useTodo()
	const [title, setTitle] = useState<string | undefined>()

	const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		// to prevent the default form behavior of submitting, we need to call
		event.preventDefault();
		addTodoItem?.(title ?? '')
	}

	return (
		<form onSubmit={handleOnSubmit} className='add-todo'>
			<label htmlFor='title'><input id='title' name='title' type='text' onChange={handleTitleChange} /></label>
			<button type='submit' disabled={!title} className='add-todo__submit-button'>Add</button>
		</form>
	)
}

export default AddTodo
