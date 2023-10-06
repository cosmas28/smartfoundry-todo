import React, { FC, useState, FormEvent } from 'react'
import { useTodo, BASE_URL } from '../../context/TodoProvider'
import './index.scss'

const AddTodo: FC = () => {
	const { setAllTodos, todos } = useTodo()
	const [title, setTitle] = useState<string>('')
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const addTodoItem = (title: string) => {
		setIsSubmitting(true)
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
			if (todos) setAllTodos?.([...todos, jsonRes.todo])
			setIsSubmitting(false)
			setTitle('')
		})
	}

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		// to prevent the default form behavior of submitting, we need to call
		event.preventDefault();
		addTodoItem?.(title ?? '')
	}

	return (
		<form onSubmit={handleOnSubmit} className='add-todo'>
			<label className='add-todo__input-wrapper' htmlFor='title'>
				<input width="100%" id='title' name='title' type='text' value={title} onChange={handleTitleChange} />
			</label>
			<button type='submit' disabled={!title} className='add-todo__submit-button'>{isSubmitting ? 'Loading...' : 'Add'}</button>
		</form>
	)
}

export default AddTodo
