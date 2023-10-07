import React from 'react';
import './index.scss';
import { AddTodo, PieChart, TodoList } from '../../components';

const TodoApp: React.FC = () => {
  return (
    <div className="todos">
      <div className="todos__section__left">
        <AddTodo />
        <TodoList />
      </div>
      <div className="todos__section__right">
        <PieChart />
      </div>
    </div>
  );
};

export default TodoApp;
