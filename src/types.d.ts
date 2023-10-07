export interface Todo {
  id: string;
  title: string;
  status: Status;
}

type Status = 'notStarted' | 'isCompleted' | 'inProgress';

type ActionType = 'ADD_TODO' | 'UPDATE_TODO' | 'DELETE_TODO' | 'ADD_ALL_TODOS';

export type Action = {
  type: ActionType;
  payload: Todo;
};
