import React, { FC, useState, FormEvent } from 'react'
import { useTodo, BASE_URL } from '../../context/TodoProvider'
import { Status, Todo } from '../../types'
import './index.scss'

type Props = {
	todo: Todo
}

const TodoItem: FC<Props> = ({ todo: { id, title, status} }) => {
	const { setAllTodos, todos } = useTodo()
	const [updatedStatus, setUpdatedStatus] = useState<Status>(status)
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [updatedTitle, setUpdatedTitle] = useState<string>(title)

	const updateTodoItem = (todo: Todo) => {
		setIsSubmitting(true)
		fetch(`${BASE_URL}/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
      cache: 'default'
    })
		.then(async() => {
			setAllTodos?.(todos?.map((existingTodo) => {
				return existingTodo.id === todo.id ? todo : existingTodo
			}) as Todo[])
			setIsSubmitting(false)
		})
	}

	const handleChange = async (event: FormEvent<HTMLSelectElement>) =>  {
    setUpdatedStatus(event.currentTarget.value as Status);
		updateTodoItem?.({ id, status: event.currentTarget.value as Status, title: updatedTitle })
  }

	const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
		setUpdatedTitle(event.currentTarget.value)
	}

	const onClickEditButton = () => {
		setIsEditing(true)
	}

	const onClickSaveButton = async (event: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
		// to prevent the default form behavior of submitting, we need to call
		event.preventDefault();
		updateTodoItem?.({ id, status: updatedStatus, title: updatedTitle })
		setIsEditing(false)
	}

	return (
		<div className='todo'>
			<form onSubmit={onClickSaveButton} className='todo__form-wrapper'>
				<div className='todo__form-wrapper__title'>
				{isEditing ? (
					<label htmlFor='title'>
						<input id='title' name='title' value={updatedTitle} onChange={handleTitleChange} />
					</label>
				) : isSubmitting ? <p>Loading...</p> : (<p>{title}</p>)}
				</div>
				<label htmlFor='status'>
          <select id='status' value={updatedStatus} onChange={handleChange}>
            <option value="notStarted">Not Started</option>
            <option value="isCompleted">Is Completed</option>
            <option value="inProgress">In Progress</option>
          </select>
        </label>
			</form>
			<div className='todo__actions'>
				<button onClick={isEditing ? onClickSaveButton : onClickEditButton} className='todo__actions__edit'>
					{isEditing ? 'Save' : isSubmitting ? 'Loading...' : 'Edit'}
				</button>
				<button>Delete</button>
			</div>
		</div>
	)
}

export default TodoItem
