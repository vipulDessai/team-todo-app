export interface singleUserInfoType {
  _id: string;
  name: string;
}
export interface AllUsersType {
  [key: string]: singleUserInfoType;
}

export interface singleTodoInfoType {
  _id?: string;
  title: string;
  priority: number;
  dueDate: number;
  createdBy: string;
  assignedTo: string;
  completed: boolean;
  __v?: number;
}

export interface AllTodosType {
  [key: string]: singleTodoInfoType;
}

export enum actionSidePanelOperationType {
  ADD,
  EDIT,
}

export interface TodoReducerInitialStateType {
  allTodos: AllTodosType;
  actionSidePanel: {
    show: boolean;
    type: actionSidePanelOperationType;
    editTodoId: string;
  };
  allUsers: AllUsersType;
  activeUserId: string | null;
  globalError: { message: string; details: any };
  showLoader: boolean;
}

export const todoReducerInitialState: TodoReducerInitialStateType = {
  allTodos: {},
  actionSidePanel: {
    show: false,
    type: actionSidePanelOperationType.ADD,
    editTodoId: null,
  },
  allUsers: {},
  activeUserId: null,
  globalError: { message: '', details: {} },
  showLoader: false,
};

export enum todoActions {
  'SET_TODO',
  'SET_EDIT_TODO_ID',
  'DELETE_TODO',
  'SET_GLOBAL_ERROR',
  'SET_GLOBAL_LOADER',
  'SET_USERS',
  'SET_ACTIVE_USER_ID',
}

export interface todoReducerActionType {
  type: todoActions;
  usersList?: AllUsersType;
  userId?: string;
  todos?: AllTodosType;
  todoId?: string;
  error?: {
    message: string;
    details: any;
  };
  sidePanel?: {
    show: boolean;
    type: actionSidePanelOperationType;
  };
  loaderState?: boolean;
}

export function todoReducer(
  state: TodoReducerInitialStateType,
  action: todoReducerActionType,
) {
  switch (action.type) {
    case todoActions.SET_USERS: {
      const stateReplica = { ...state };
      stateReplica.allUsers = action.usersList;
      return stateReplica;
    }
    case todoActions.SET_ACTIVE_USER_ID: {
      const stateReplica = { ...state };
      stateReplica.activeUserId = action.userId;
      return stateReplica;
    }

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
    case todoActions.SET_EDIT_TODO_ID: {
      const stateReplica = { ...state };
      stateReplica.actionSidePanel = {
        editTodoId: action.todoId || null,
        show: action.sidePanel.show,
        type: action.sidePanel.type,
      };
      return stateReplica;
    }

    case todoActions.SET_GLOBAL_ERROR: {
      const stateReplica = { ...state };
      stateReplica.globalError = {
        message: action.error.message,
        details: action.error.details,
      };
      return stateReplica;
    }

    case todoActions.SET_GLOBAL_LOADER: {
      const stateReplica = { ...state };
      stateReplica.showLoader = action.loaderState;
      return stateReplica;
    }

    default:
      return state;
  }
}
