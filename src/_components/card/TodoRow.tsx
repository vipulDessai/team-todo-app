import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import {
  actionSidePanelOperationType,
  singleTodoInfoType,
  todoActions,
  todoStore,
} from '@/_reducer';
import { TodoPriority } from '@/_helper';

interface TodoRowType {
  extraDetailsRequired?: boolean;
  todoInfo: singleTodoInfoType;
}

const priorityTodoIndexed = Object.keys(TodoPriority).filter((priorityKeys) =>
  isNaN(parseInt(priorityKeys)),
);

export const TodoRow = ({ extraDetailsRequired, todoInfo }: TodoRowType) => {
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
    <ul className="todo-row" onClick={openEditTodoSidePanel}>
      <li className="todo-selection-group">
        <ul>
          <li>
            <div
              className={`completed-status ${
                todoInfo.completed ? 'completed' : ''
              }`}></div>
          </li>
        </ul>
      </li>
      <li className="todo-details">
        <ul>
          <li className="todo-name">{todoInfo.title}</li>
          {extraDetailsRequired && (
            <li className="todo-extra-details">
              <ul>
                <li className="priority-details-section">
                  <ul className={`tag-number-${todoInfo.priority}`}>
                    <li>{priorityTodoIndexed[todoInfo.priority]}</li>
                  </ul>
                </li>
                <li className="user-details-section">
                  <ul>
                    <li>{allUsers[todoInfo.assignedTo].name}</li>
                    <li>
                      <div className="user-icon">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </li>
    </ul>
  );
};
