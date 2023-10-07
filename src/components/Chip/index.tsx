import React from 'react'
import { Status } from '../../types'
import './index.scss'

type Props = {
	status: Status
}

export const statusMapping: {[Key in Status]: string} = {
	notStarted: 'No Started',
	inProgress: 'In Progress',
	isCompleted: 'Is Completed'
}

const Chip: React.FC<Props> = ({ status }) => {
	return (
		<span className={`chip chip--${status}`}>{statusMapping[status]}</span>
	)
}

export default Chip
