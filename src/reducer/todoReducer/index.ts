import { Todo, Action } from '../../types'

export const todoReducer = (todos: Todo[], action: Action) => {
	switch(action.type) {
		case 'ADD_ALL_TODOS': {
			return todos
		}
		case 'ADD_TODO': {
			return [
				...todos,
				action.payload
			]
		}
		case 'UPDATE_TODO': {
			return todos.map((todo) => {
				return todo.id === action.payload.id ? action.payload : todo
			})
		}
		case 'DELETE_TODO': {
			return todos.filter((todo) => todo.id !== action.payload.id)
		}
		default: {
      throw Error('Unknown action: ' + action.type);
    }
	}
}
