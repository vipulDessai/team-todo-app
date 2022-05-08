import React from 'react';
import {
  todoActions,
  TodoReducerInitialStateType,
  todoReducerActionType,
} from './todo.reducer';

const Store = React.createContext([]);
Store.displayName = 'todo-app-store';

export const todoStore = () =>
  React.useContext(Store) as [
    TodoReducerInitialStateType,
    React.Dispatch<todoReducerActionType>,
  ];

interface TodoStoreProviderType {
  children: React.ReactNode;
  reducerData: [
    TodoReducerInitialStateType,
    React.Dispatch<{ type: todoActions }>,
  ];
}

export const TodoStoreProvider = ({
  children,
  reducerData,
}: TodoStoreProviderType) => {
  return <Store.Provider value={reducerData}>{children}</Store.Provider>;
};
