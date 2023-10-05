import React, { FC, useState, FormEvent } from 'react'
import './index.scss'

type Props = {
	id: string
	title: string
}

const TodoItem: FC<Props> = ({ id, title }) => {
	const [status, setStatus] = useState<string>('')
	const handleChange = (event: FormEvent<HTMLSelectElement>) =>  {
    setStatus(event.currentTarget.value);
  }
	return (
		<div className='todo'>
			<form className='todo__form-wrapper'>
				<p className='todo__form-wrapper__title'>{title}</p>
				<label htmlFor='status'>
          <select id='status' value={status} onChange={handleChange}>
            <option value="notStarted">Not Started</option>
            <option value="isCompleted">Is Completed</option>
            <option value="inProgress">In Progress</option>
          </select>
        </label>
			</form>
			<div className='todo__actions'>
				<button className='todo__actions__edit'>Edit</button>
				<button>Delete</button>
			</div>
		</div>
	)
}

export default TodoItem
