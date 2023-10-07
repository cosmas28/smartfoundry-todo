import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle
} from 'react-beautiful-dnd'
import './index.scss'
import { TodoItem } from '../../components'
import { useTodo } from '../../context/TodoProvider'
import { Todo } from '../../types'

const reorderList = (
  list: Array<Todo>,
  startIndex: number,
  endIndex: number
): Array<Todo> => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
	width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'gray' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle
})

const TodoList: React.FC = () => {
	const { todos, loading } = useTodo()
	const [initialState, setInitialState] = useState<Todo[]>([])
  const [state, setState] = useState<Todo[]>()

  useEffect(() => {
    if (todos) {
      setInitialState(todos)
    }
  }, [todos])

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    if (initialState) {
      const items = reorderList(initialState, result.source.index, result.destination.index)

      setState(items)
    }
  }

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
				{(provided): JSX.Element => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
						className='todo-list'
          >
            {state
              ? state.length !== 0 &&
                state.map((item: Todo, index: number) => (
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
                ))
              : initialState &&
                initialState.length !== 0 &&
                initialState.map((item: Todo, index: number) => (
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
			{loading && <div className='loading'><p>Loading...</p></div>}
		</>
	)
}

export default TodoList
