import React, { useEffect, useReducer } from 'react';

import {
  TodoStoreProvider,
  todoReducerInitialState,
  todoReducer,
  todoActions,
  singleTodoInfoType,
} from '@/_reducer';
import { BabyCard, MonsterCard } from './card';

const dummyTodos: {
  [key: string]: singleTodoInfoType;
} = {};
for (let index = 0; index < 100; index++) {
  dummyTodos['todo-' + index] = {
    id: 'todo-' + index,
    title: 'Todo - ' + index + 1,
    priority: 1,
    dueDate: 134343,
    createdBy: '',
    assignedTo: 'user-1',
  };
}

export default function App() {
  const [todoReducerState, dispatch] = useReducer(
    todoReducer,
    todoReducerInitialState,
  );

  useEffect(() => {
    dispatch({ type: todoActions.SET_TODO, todos: dummyTodos });
  }, []);

  return (
    <TodoStoreProvider reducerData={[todoReducerState, dispatch]}>
      <MonsterCard title="All todos" filterCriteria=""></MonsterCard>
      <BabyCard title="Assigned to me" filterCriteria=""></BabyCard>
    </TodoStoreProvider>
  );
}
