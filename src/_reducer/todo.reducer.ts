export interface singleTodoInfoType {
  id: string;
  title: string;
  priority: number;
  dueDate: number;
  createdBy: string;
  assignedTo: string;
}

export interface TodoReducerInitialStateType {
  allTodos: {
    [key: string]: singleTodoInfoType;
  };
}

export const todoReducerInitialState: TodoReducerInitialStateType = {
  allTodos: {},
};

export const todoActions = {
  SET_TODO: 'SET_TODO',
  DELETE_TODO: 'DELETE_TODO',
};

export function todoReducer(
  state: TodoReducerInitialStateType,
  action: {
    type: string;
    todos?: {
      [key: string]: singleTodoInfoType;
    };
    todoId?: string;
  },
) {
  switch (action.type) {
    case todoActions.SET_TODO: {
      const stateReplica = { ...state };
      stateReplica.allTodos = { ...stateReplica.allTodos, ...action.todos };
      return stateReplica;
    }

    case todoActions.DELETE_TODO: {
      const stateReplica = { ...state };
      delete stateReplica.allTodos[action.todoId];
      return stateReplica;
    }

    default:
      return state;
  }
}
