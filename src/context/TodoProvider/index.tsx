/* eslint-disable import/named */
import React, { useContext, createContext, ReactElement, useState, useEffect } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Todo } from '../../types';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  todos: Todo[];
  loading: boolean;
  setAllTodos: (todos: Todo[]) => void;
  onDragEnd: (result: DropResult) => void;
};

const TodoContext = createContext<Partial<Props>>({});

export const useTodo = () => useContext(TodoContext);

const reorderList = (list: Array<Todo>, startIndex: number, endIndex: number): Array<Todo> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const TodoProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [todos, setAllTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/todos`).then(async (res) => {
      const fetchedTodos = await res.json();
      setAllTodos(fetchedTodos.todos);
      setLoading(false);
    });
  }, []);

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (todos) {
      const items = reorderList(todos, result.source.index, result.destination.index);

      setAllTodos(items);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        setAllTodos,
        onDragEnd,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
