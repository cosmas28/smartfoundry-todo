import React, { FC } from 'react'
import './index.scss'

const AddTodo: FC = () => {
	return (
		<form className='add-todo'>
			<label htmlFor='title'><input id='title' name='title' type='text' /></label>
			<button className='add-todo__submit-button'>Add</button>
		</form>
	)
}

export default AddTodo
