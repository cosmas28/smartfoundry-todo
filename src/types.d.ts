export interface Todo {
	id: string;
	title: string;
	body: string;
	status: Status;
}

type Status = 'notStarted' | 'isCompleted' | 'inProgress'
