/* eslint-disable import/named */
import React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import './index.scss';
import { TodoItem } from '../../components';
import { useTodo } from '../../context/TodoProvider';
import { Todo } from '../../types';

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'gray' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = () => ({
  background: 'white',
  width: '100%',
});

const TodoList: React.FC = () => {
  const { todos, loading, onDragEnd } = useTodo();

  return (
    <div className="todo-list">
      <DragDropContext onDragEnd={onDragEnd as (result: DropResult) => void}>
        <Droppable droppableId="droppable">
          {(provided): JSX.Element => (
            <ul {...provided.droppableProps} ref={provided.innerRef} style={getListStyle()}>
              {todos &&
                todos.length !== 0 &&
                todos.map((item: Todo, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot): JSX.Element => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <TodoItem todo={item} />
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
