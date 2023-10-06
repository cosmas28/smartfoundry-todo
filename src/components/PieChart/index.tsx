import React, { useMemo, FC } from 'react'
import { countBy } from 'lodash'
import './index.scss'
import { useTodo } from '../../context/TodoProvider'
import { Status } from '../../types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: FC = () => {
	const { todos } = useTodo()
	const chartData = useMemo(() => {
		const colors: {[Key in Status]: string} = {
			notStarted: '#696969',
			inProgress: '#FFFF00',
			isCompleted: '#008000'
		}

		const groupedTodos = countBy(todos, 'status')
		const labels: Status[] = Object.keys(groupedTodos) as Status[]
		const backgroundColors = labels.map((label) => colors[label])

		return {
			labels: labels,
			datasets: [
				{
					data: Object.values(groupedTodos),
					backgroundColor: backgroundColors,
					borderColor: backgroundColors,
					borderWidth: 1,
				},
			],
		}
	}, [todos])

	return (
		<div className='pie-chart'>
			<Pie data={chartData} />
		</div>
	)
}

export default PieChart
