import React from 'react';

import './ExpandCard.scss';

import {
  actionSidePanelOperationType,
  singleTodoInfoType,
  todoActions,
  todoStore,
} from '@/_reducer';
import { TodoPriority } from '@/_helper';

export const ExpandCard = () => {
  const [todoReducerState, dispatch] = todoStore();
  const { allUsers } = todoReducerState;

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  const priorityTodoIndexed = Object.keys(TodoPriority).filter((priorityKeys) =>
    isNaN(parseInt(priorityKeys)),
  );

  return (
    <section className="expand-card">
      <header>
        <ul>
          <li>
            <h3>All todos</h3>
          </li>
          <li className="add-section">
            <button
              className="btn primary"
              onClick={(e) =>
                dispatch({
                  type: todoActions.SET_EDIT_TODO_ID,
                  sidePanel: {
                    show: true,
                    type: actionSidePanelOperationType.ADD,
                  },
                })
              }>
              Add
            </button>
          </li>
        </ul>
      </header>
      <section className="table-overflow-section">
        <table className="all-todos-table">
          <thead>
            <tr>
              <th data-width="10%"></th>
              <th data-width="20%">Title</th>
              <th data-width="10%">Priority</th>
              <th data-width="10%">Due date</th>
              <th data-width="10%">Created by</th>
              <th data-width="10%">Assigned to</th>
              <th data-width="10%">Action</th>
            </tr>
          </thead>
          <tbody>
            {allTodosPerCard.map((todoInfo) => (
              <tr key={todoInfo._id}>
                <td>
                  <div
                    className={`completed-status ${
                      todoInfo.completed ? 'completed' : ''
                    }`}></div>
                </td>
                <td className="todo-title" title={todoInfo.title}>
                  <span>{todoInfo.title}</span>
                </td>
                <td>
                  <ul className={`tag-number-${todoInfo.priority}`}>
                    <li>{priorityTodoIndexed[todoInfo.priority]}</li>
                  </ul>
                </td>
                <td>{todoInfo.dueDate}</td>
                <td>{allUsers[todoInfo.createdBy].name}</td>
                <td>{allUsers[todoInfo.assignedTo].name}</td>
                <td>
                  <button
                    className="btn primary"
                    onClick={(e) =>
                      dispatch({
                        type: todoActions.SET_EDIT_TODO_ID,
                        todoId: todoInfo._id,
                        sidePanel: {
                          show: true,
                          type: actionSidePanelOperationType.EDIT,
                        },
                      })
                    }>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};
