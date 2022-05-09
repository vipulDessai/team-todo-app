import React, { useState } from 'react';

import './EditOrAddTodo.scss';

import { requestHandler, requestType, requestUrls } from '@/_helper';
import {
  actionSidePanelOperationType,
  singleTodoInfoType,
  singleUserInfoType,
  todoActions,
  todoStore,
} from '@/_reducer';

enum TodoPriority {
  'High',
  'Medium',
  'Low',
}

enum TodoEditOrAddOperationType {
  'UPDATE',
  'CREATE',
  'MARK_COMPLETE',
  'DELETE',
}

export const EditOrAddTodo = () => {
  const [todoReducerState, dispatch] = todoStore();
  const [showDeleteTodoPopup, setShowDeleteTodoPopup] = useState(false);

  const sidePanelOperation = todoReducerState.actionSidePanel.type;

  const allUsers: singleUserInfoType[] = Object.values(
    todoReducerState.allUsers,
  );

  const todoInfo: singleTodoInfoType =
    sidePanelOperation === actionSidePanelOperationType.EDIT
      ? todoReducerState.allTodos[todoReducerState.actionSidePanel.editTodoId]
      : {
          title: '',
          priority: 0,
          dueDate: 0,
          createdBy: todoReducerState.activeUserId,
          assignedTo: allUsers[0]._id,
          completed: false,
        };

  const [componentLevelTodoInfo, setComponentLevelTodoInfo] =
    useState(todoInfo);

  const saveOrUpdateTodo = async (
    e: React.MouseEvent<HTMLElement>,
    operationType: TodoEditOrAddOperationType,
  ) => {
    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: true });

    let requestPayload, url, requestTypeString;
    switch (operationType) {
      case TodoEditOrAddOperationType.UPDATE:
        {
          requestPayload = {
            _id: todoInfo._id,
            updatedData: { ...componentLevelTodoInfo },
          };
          delete requestPayload.updatedData.__v;
          delete requestPayload.updatedData._id;

          url = requestUrls.TODOS;
          requestTypeString = requestType.PUT;
        }
        break;

      case TodoEditOrAddOperationType.MARK_COMPLETE:
        {
          requestPayload = {
            _id: todoInfo._id,
            updatedData: { ...todoInfo, completed: true },
          };
          delete requestPayload.updatedData.__v;
          delete requestPayload.updatedData._id;

          url = requestUrls.TODOS;
          requestTypeString = requestType.PUT;
        }
        break;

      case TodoEditOrAddOperationType.CREATE:
        {
          requestPayload = { ...componentLevelTodoInfo };
          url = requestUrls.TODOS;
          requestTypeString = requestType.POST;
        }
        break;

      case TodoEditOrAddOperationType.DELETE:
        {
          requestPayload = { _id: todoInfo._id };
          url = requestUrls.TODOS;
          requestTypeString = requestType.DELETE;
        }
        break;

      default:
        break;
    }

    const { error, data, statusCode } = await requestHandler(
      url,
      requestTypeString,
      requestPayload,
    );

    if (error) {
      dispatch({
        type: todoActions.SET_GLOBAL_ERROR,
        error: { message: error.message, details: error },
      });
    } else {
      if (data && data.operationCompleted) {
        dispatch({
          type: todoActions.SET_EDIT_TODO_ID,
          todoId: null,
          sidePanel: {
            show: false,
            type: actionSidePanelOperationType.EDIT,
          },
        });
      }
    }

    dispatch({ type: todoActions.SET_GLOBAL_LOADER, loaderState: false });
  };

  return (
    <>
      <section className="edit-or-add-todo-side-panel">
        <header>
          <ul>
            {sidePanelOperation === actionSidePanelOperationType.EDIT && (
              <li>
                <h3>Edit Todo</h3>
              </li>
            )}
            {sidePanelOperation === actionSidePanelOperationType.ADD && (
              <li>
                <h3>Add Todo</h3>
              </li>
            )}
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
                  {Object.values(TodoPriority).map((key, value) => (
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
        </ul>
        <footer>
          {sidePanelOperation === actionSidePanelOperationType.EDIT && (
            <ul>
              <li>
                <ul>
                  <li>
                    <button
                      onClick={(e) =>
                        dispatch({
                          type: todoActions.SET_EDIT_TODO_ID,
                          todoId: null,
                          sidePanel: {
                            show: false,
                            type: null,
                          },
                        })
                      }
                      className="close-button">
                      close
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) =>
                        saveOrUpdateTodo(e, TodoEditOrAddOperationType.UPDATE)
                      }
                      disabled={componentLevelTodoInfo.completed}>
                      Save
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>Do you want to mark the todo as complete?</li>
                  <li>
                    <button
                      onClick={(e) =>
                        saveOrUpdateTodo(
                          e,
                          TodoEditOrAddOperationType.MARK_COMPLETE,
                        )
                      }
                      disabled={componentLevelTodoInfo.completed}>
                      Mark complete
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>Do you want to delete the todo?</li>
                  <li>
                    <button onClick={(e) => setShowDeleteTodoPopup(true)}>
                      Delete todo
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          {sidePanelOperation === actionSidePanelOperationType.ADD && (
            <ul>
              <li>
                <button
                  onClick={(e) =>
                    saveOrUpdateTodo(e, TodoEditOrAddOperationType.CREATE)
                  }>
                  Add
                </button>
              </li>
              <li>
                <button
                  onClick={(e) =>
                    dispatch({
                      type: todoActions.SET_EDIT_TODO_ID,
                      todoId: null,
                      sidePanel: {
                        show: false,
                        type: null,
                      },
                    })
                  }
                  className="close-button">
                  close
                </button>
              </li>
            </ul>
          )}
        </footer>
      </section>
      {showDeleteTodoPopup && (
        <section>
          <header>Delete Todo</header>
          Are you sure you want to delete the todo, this process is irreversible
          <footer>
            <button
              onClick={(e) =>
                saveOrUpdateTodo(e, TodoEditOrAddOperationType.DELETE)
              }>
              Yes
            </button>
            <button onClick={(e) => setShowDeleteTodoPopup(false)}>No</button>
          </footer>
        </section>
      )}
    </>
  );
};
