import React, { FC, useState, FormEvent } from 'react';
import { useTodo, BASE_URL } from '../../context/TodoProvider';
import './index.scss';

const AddTodo: FC = () => {
  const { setAllTodos, todos } = useTodo();
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const addTodoItem = (title: string) => {
    setIsSubmitting(true);
    fetch(`${BASE_URL}/api/todos`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
      cache: 'default',
    }).then(async (res) => {
      const jsonRes = await res.json();
      if (jsonRes.error) {
        setError(jsonRes.error);
      } else if (jsonRes.todo && todos) setAllTodos?.([...todos, jsonRes.todo]);
      setIsSubmitting(false);
      setTitle('');
    });
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    // to prevent the default form behavior of submitting, we need to call
    event.preventDefault();
    setError('');
    addTodoItem?.(title ?? '');
  };

  return (
    <div className="add-todo-wrapper">
      <form onSubmit={handleOnSubmit} className="add-todo">
        <label htmlFor="title">What do you want to do?</label>
        <span className="add-todo__input-wrapper">
          <input
            aria-label="Title"
            width="100%"
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <button type="submit" disabled={!title} className="add-todo__submit-button">
            {isSubmitting ? <span>Loading...</span> : 'Add'}
          </button>
        </span>
      </form>
      <p className="add-todo-wrapper__error">{error}</p>
    </div>
  );
};

export default AddTodo;
