import React from 'react';

import { singleTodoInfoType } from '@/_reducer';

interface TodoRowType {
  userIconRequired: boolean;
  todoInfo: singleTodoInfoType;
}

export const TodoRow = ({ userIconRequired, todoInfo }: TodoRowType) => {
  return (
    <ul>
      <li>{todoInfo.title}</li>
      <li>{todoInfo.priority}</li>
      {userIconRequired && <li>{todoInfo.assignedTo}</li>}
    </ul>
  );
};
