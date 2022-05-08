export interface singleTodoInfoType {
  _id: string;
  title: string;
  priority: number;
  dueDate: number;
  createdBy: string;
  assignedTo: string;
}

export interface AllTodoType {
  [key: string]: singleTodoInfoType;
}

export interface TodoReducerInitialStateType {
  allTodos: AllTodoType;
  globalError: string;
}

export const todoReducerInitialState: TodoReducerInitialStateType = {
  allTodos: {},
  globalError: '',
};

export enum todoActions {
  'SET_TODO',
  'DELETE_TODO',
  'SET_GLOBAL_ERROR',
}

interface todoReducerActionType {
  type: todoActions;
  todos?: {
    [key: string]: singleTodoInfoType;
  };
  todoId?: string;
  errorMessage?: string;
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

    case todoActions.SET_GLOBAL_ERROR: {
      const stateReplica = { ...state };
      stateReplica.globalError = action.errorMessage;
      return stateReplica;
    }

    default:
      return state;
  }
}
