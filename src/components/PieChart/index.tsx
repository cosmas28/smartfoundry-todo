import React, { useMemo } from 'react';
import { countBy } from 'lodash';
import './index.scss';
import { useTodo } from '../../context/TodoProvider';
import { Status } from '../../types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { statusMapping } from '../Chip';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const { todos } = useTodo();
  const chartData = useMemo(() => {
    const colors: { [Key in Status]: string } = {
      notStarted: '#8F8F8F',
      inProgress: '#FFFF00',
      isCompleted: '#00F500',
    };

    const groupedTodos = countBy(todos, 'status');
    const labels: Status[] = Object.keys(groupedTodos) as Status[];
    const backgroundColors = labels.map((label) => colors[label]);

    return {
      labels: labels.map((label) => statusMapping[label]),
      datasets: [
        {
          data: Object.values(groupedTodos),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  }, [todos]);

  return (
    <div className="pie-chart">
      <h3>Total number of todos on each status</h3>
      <Pie data={chartData} style={{ display: 'flex', width: '100%', justifyContent: 'center' }} />
    </div>
  );
};

export default PieChart;
