import React, { useState } from 'react';

import { requestHandler, requestType, requestUrls } from '@/_helper';
import {
  singleTodoInfoType,
  singleUserInfoType,
  todoActions,
  todoStore,
} from '@/_reducer';

enum todoPriority {
  'High',
  'Medium',
  'Low',
}

export const EditTodo = ({}) => {
  const [todoReducerState, dispatch] = todoStore();
  const [showDeleteTodoPopup, setShowDeleteTodoPopup] = useState(false);

  const todoInfo: singleTodoInfoType =
    todoReducerState.allTodos[todoReducerState.editTodoId];

  const [componentLevelTodoInfo, setComponentLevelTodoInfo] =
    useState(todoInfo);

  const saveOrUpdateTodo = async (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: true });

    const requestPayload = {
      _id: componentLevelTodoInfo._id,
      updatedData: { ...componentLevelTodoInfo },
    };
    delete requestPayload.updatedData.__v;
    delete requestPayload.updatedData._id;

    const { error, data, statusCode } = await requestHandler(
      requestUrls.TODOS,
      requestType.PUT,
      requestPayload,
    );

    if (error) {
      dispatch({
        type: todoActions.SET_GLOBAL_ERROR,
        error: { message: error.message, details: error },
      });
    } else {
      if (data && data.documentUpdated) {
        dispatch({ type: todoActions.SET_EDIT_TODO_ID, todoId: null });
      }
    }

    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: false });
  };

  const markTodoComplete = async (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: true });

    const requestPayload = {
      _id: todoInfo._id,
      updatedData: { ...todoInfo, completed: true },
    };
    delete requestPayload.updatedData.__v;
    delete requestPayload.updatedData._id;

    const { error, data, statusCode } = await requestHandler(
      requestUrls.TODOS,
      requestType.PUT,
      requestPayload,
    );

    if (error) {
      dispatch({
        type: todoActions.SET_GLOBAL_ERROR,
        error: { message: error.message, details: error },
      });
    } else {
      if (data && data.documentDeleted) {
        dispatch({ type: todoActions.SET_EDIT_TODO_ID, todoId: null });
      }
    }

    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: false });
  };

  const deleteTodo = async (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: true });

    const { error, data, statusCode } = await requestHandler(
      requestUrls.TODOS,
      requestType.DELETE,
    );

    if (error) {
      dispatch({
        type: todoActions.SET_GLOBAL_ERROR,
        error: { message: error.message, details: error },
      });
    } else {
      if (data && data.documentDeleted) {
        setShowDeleteTodoPopup(false);
        dispatch({ type: todoActions.DELETE_TODO, todoId: todoInfo._id });
        dispatch({ type: todoActions.SET_EDIT_TODO_ID, todoId: null });
      }
    }

    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: false });
  };

  const allUsers: singleUserInfoType[] = Object.values(
    todoReducerState.allUsers,
  );

  return (
    <>
      <section>
        <header>
          <ul>
            <li>Edit Todo</li>
            <li>
              <button
                onClick={(e) =>
                  dispatch({ type: todoActions.SET_EDIT_TODO_ID, todoId: null })
                }
                className="close-button">
                close
              </button>
            </li>
          </ul>
        </header>
        <ul>
          <li>
            <ul>
              <li>Title</li>
              <li>
                <input
                  type="text"
                  name="title"
                  defaultValue={componentLevelTodoInfo.title}
                  onChange={(e) =>
                    setComponentLevelTodoInfo((componentLevelTodoInfo) => ({
                      ...componentLevelTodoInfo,
                      title: e.target.value,
                    }))
                  }
                />
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>Priority</li>
              <li>
                <select
                  name="priority"
                  onChange={(e) =>
                    setComponentLevelTodoInfo((componentLevelTodoInfo) => ({
                      ...componentLevelTodoInfo,
                      priority: parseInt(e.target.value),
                    }))
                  }>
                  {Object.values(todoPriority).map((key, value) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>Due Date</li>
              <li>
                <input
                  type="text"
                  name="due-date"
                  defaultValue={componentLevelTodoInfo.dueDate}
                  onChange={(e) =>
                    setComponentLevelTodoInfo((componentLevelTodoInfo) => ({
                      ...componentLevelTodoInfo,
                      dueDate: parseInt(e.target.value),
                    }))
                  }
                />
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>Assigned to:</li>
              <li>
                <select
                  name="assigned-to-user"
                  onChange={(e) =>
                    setComponentLevelTodoInfo((componentLevelTodoInfo) => ({
                      ...componentLevelTodoInfo,
                      assignedTo: e.target.value,
                    }))
                  }
                  defaultValue={componentLevelTodoInfo.assignedTo}>
                  {allUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </li>
          <li>
            <button
              onClick={saveOrUpdateTodo}
              disabled={componentLevelTodoInfo.completed}>
              Save
            </button>
          </li>
          <li>
            <button
              onClick={markTodoComplete}
              disabled={componentLevelTodoInfo.completed}>
              Mark complete
            </button>
          </li>
          <li>
            <button onClick={(e) => setShowDeleteTodoPopup(true)}>
              Delete todo
            </button>
          </li>
        </ul>
      </section>
      {showDeleteTodoPopup && (
        <section>
          <header>Delete Todo</header>
          Are you sure you want to delete the todo, this process is irreversible
          <footer>
            <button onClick={deleteTodo}>Yes</button>
            <button onClick={(e) => setShowDeleteTodoPopup(false)}>No</button>
          </footer>
        </section>
      )}
    </>
  );
};
