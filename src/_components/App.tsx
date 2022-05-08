import React, { useCallback, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '@/_components/App.scss';

import {
  TodoStoreProvider,
  todoReducerInitialState,
  todoReducer,
  todoActions,
} from '@/_reducer';
import {
  requestHandler,
  requestType,
  requestUrls,
  commonMethods,
} from '@/_helper';
import { EditOrAddTodo } from './edit-or-add-todo/EditOrAddTodo';
import { Dashboard } from './dashboard/Dashboard';
import { ExpandCard } from './expand-card/ExpandCard';

export default function App() {
  const [todoReducerState, dispatch] = useReducer(
    todoReducer,
    todoReducerInitialState,
  );

  const begin = useCallback(async () => {
    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: true });

    // fetch all the user
    {
      const { error, data, statusCode } = await requestHandler(
        requestUrls.USERS,
        requestType.GET,
      );

      if (error) {
        dispatch({
          type: todoActions.SET_GLOBAL_ERROR,
          error: { message: error.message, details: error },
        });
      } else {
        const structuredUsersFromArray = commonMethods.arrayToObject(
          data.users,
          (user) => user['_id'],
        );
        dispatch({
          type: todoActions.SET_USERS,
          usersList: structuredUsersFromArray,
        });
        dispatch({
          type: todoActions.SET_ACTIVE_USER_ID,
          userId: data.users[0]._id,
        });
      }
    }

    // fetch all the todos
    {
      const { error, data, statusCode } = await requestHandler(
        requestUrls.TODOS,
        requestType.GET,
      );
      if (error) {
        dispatch({
          type: todoActions.SET_GLOBAL_ERROR,
          error: { message: error.message, details: error },
        });
      } else {
        const structuredTodoFromArray = commonMethods.arrayToObject(
          data.todos,
          (todo) => todo['_id'],
        );
        dispatch({
          type: todoActions.SET_TODO,
          todos: structuredTodoFromArray,
        });
      }
    }

    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: false });
  }, []);

  useEffect(() => {
    begin();
  }, [begin]);

  return (
    <TodoStoreProvider reducerData={[todoReducerState, dispatch]}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expand-card" element={<ExpandCard />} />
        </Routes>
      </Router>
      {todoReducerState.actionSidePanel.show && <EditOrAddTodo />}
    </TodoStoreProvider>
  );
}
