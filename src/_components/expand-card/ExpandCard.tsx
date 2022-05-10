import React from 'react';

import {
  actionSidePanelOperationType,
  singleTodoInfoType,
  todoActions,
  todoStore,
} from '@/_reducer';

export const ExpandCard = () => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <section>
      <header>
        <ul>
          <li>
            <h3>All todos</h3>
          </li>
          <li>
            <button
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
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Priority</th>
            <th>Due date</th>
            <th>Created by</th>
            <th>Assigned to</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allTodosPerCard.map((singleTodo) => (
            <tr key={singleTodo._id}>
              <td>
                <input
                  type="checkbox"
                  name="todo-completed"
                  defaultChecked={singleTodo.completed}
                />
              </td>
              <td>{singleTodo.title}</td>
              <td>{singleTodo.priority}</td>
              <td>{singleTodo.dueDate}</td>
              <td>{singleTodo.createdBy}</td>
              <td>{singleTodo.assignedTo}</td>
              <td>
                <button
                  onClick={(e) =>
                    dispatch({
                      type: todoActions.SET_EDIT_TODO_ID,
                      todoId: singleTodo._id,
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
  );
};
