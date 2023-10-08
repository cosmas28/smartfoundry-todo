import React, { useMemo } from 'react';
import { countBy, round } from 'lodash';
import './index.scss';
import { AddTodo, PieChart, TodoList } from '../../components';
import { useTodo } from '../../context/TodoProvider';

const TodoApp: React.FC = () => {
  const { todos } = useTodo();

  const rateOfCompletion = useMemo(() => {
    const countByStatus = countBy(todos, 'status');

    return todos && countByStatus['isCompleted'] > 0 ? (countByStatus['isCompleted'] / todos.length) * 100 : 0;
  }, [todos]);

  return (
    <div className="container">
      <header className="container__heading">
        <h2>Rate of completion: {round(rateOfCompletion, 2)}%</h2>
      </header>
      <div className="todos">
        <div className="todos__section__left">
          <AddTodo />
          <TodoList />
        </div>
        <div className="todos__section__right">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
