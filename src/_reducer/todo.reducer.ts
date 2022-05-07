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

export enum todoActions {
  'SET_TODO',
  'DELETE_TODO',
}

interface todoReducerActionType {
  type: todoActions;
  todos?: {
    [key: string]: singleTodoInfoType;
  };
  todoId?: string;
}

export function todoReducer(
  state: TodoReducerInitialStateType,
  action: todoReducerActionType,
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
