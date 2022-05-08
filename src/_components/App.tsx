import React, { useCallback, useEffect, useReducer } from 'react';

import {
  TodoStoreProvider,
  todoReducerInitialState,
  todoReducer,
  todoActions,
  singleTodoInfoType,
  AllTodoType,
} from '@/_reducer';
import { BabyCard, MonsterCard } from './card';
import { requestHandler, requestType, requestUrls } from '@/_helper';
import { commonMethods } from '@/_helper/common-methods';

const dummyTodos: {
  [key: string]: singleTodoInfoType;
} = {};
for (let index = 0; index < 100; index++) {
  dummyTodos['todo-' + index] = {
    _id: 'todo-' + index,
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

  const begin = useCallback(async () => {
    const { error, data, statusCode } = await requestHandler(
      requestUrls.TODOS,
      requestType.GET,
    );
    if (error) {
    } else {
      const structuredTodoFromArray: AllTodoType = commonMethods.arrayToObject(
        data.todos,
        (todo) => todo['_id'],
      );
      dispatch({ type: todoActions.SET_TODO, todos: structuredTodoFromArray });
    }
  }, []);

  useEffect(() => {
    begin();
  }, [begin]);

  return (
    <TodoStoreProvider reducerData={[todoReducerState, dispatch]}>
      <MonsterCard title="All todos" filterCriteria=""></MonsterCard>
      <BabyCard title="Assigned to me" filterCriteria=""></BabyCard>
    </TodoStoreProvider>
  );
}
