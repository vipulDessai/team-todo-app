import React from 'react';

import {
  actionSidePanelOperationType,
  singleTodoInfoType,
  todoActions,
  todoStore,
} from '@/_reducer';
import { TodoPriority } from '@/_helper';

interface TodoRowType {
  userIconRequired: boolean;
  todoInfo: singleTodoInfoType;
}

const priorityTodoIndexed = Object.keys(TodoPriority).filter((priorityKeys) =>
  isNaN(parseInt(priorityKeys)),
);

export const TodoRow = ({ userIconRequired, todoInfo }: TodoRowType) => {
  const [todoReducerState, dispatch] = todoStore();
  const { allUsers } = todoReducerState;

  const openEditTodoSidePanel = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      type: todoActions.SET_EDIT_TODO_ID,
      todoId: todoInfo._id,
      sidePanel: { show: true, type: actionSidePanelOperationType.EDIT },
    });
  };

  return (
    <ul className="todo-row">
      <li>{todoInfo.title}</li>
      <li>{priorityTodoIndexed[todoInfo.priority]}</li>
      {userIconRequired && <li>{allUsers[todoInfo.assignedTo].name}</li>}
      <li>
        <button onClick={openEditTodoSidePanel}>Edit</button>
      </li>
    </ul>
  );
};
