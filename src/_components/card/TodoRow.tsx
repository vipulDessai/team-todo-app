import React from 'react';

import { singleTodoInfoType, todoActions, todoStore } from '@/_reducer';

interface TodoRowType {
  userIconRequired: boolean;
  todoInfo: singleTodoInfoType;
}

export const TodoRow = ({ userIconRequired, todoInfo }: TodoRowType) => {
  const [todoReducerState, dispatch] = todoStore();

  const openEditTodoSidePanel = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: todoActions.SET_EDIT_TODO_ID, todoId: todoInfo._id });
  };

  return (
    <ul>
      <li>{todoInfo.title}</li>
      <li>{todoInfo.priority}</li>
      {userIconRequired && <li>{todoInfo.assignedTo}</li>}
      <li>
        <button onClick={openEditTodoSidePanel}>Edit</button>
      </li>
    </ul>
  );
};
