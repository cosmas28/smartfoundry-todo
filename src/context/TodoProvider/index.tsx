import React, { useContext, createContext, ReactElement, useState, useEffect } from 'react';
import { Todo } from '../../types';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  todos: Todo[];
  loading: boolean;
  setAllTodos: (todos: Todo[]) => void;
};

const TodoContext = createContext<Partial<Props>>({});

export const useTodo = () => useContext(TodoContext);

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

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        setAllTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
