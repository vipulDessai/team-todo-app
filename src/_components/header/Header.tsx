import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

import { singleUserInfoType, todoActions, todoStore } from '@/_reducer';

export const Header = () => {
  const [todoReducerState, dispatch] = todoStore();
  const { allUsers } = todoReducerState;

  const activeUserData = Object.keys(todoReducerState.allUsers).length
    ? todoReducerState.allUsers[todoReducerState.activeUserId]
    : { name: 'loading' };

  const [showSelectUserMenu, setShowSelectUserMenu] = useState(false);

  const onUserSelect = (
    e: React.MouseEvent<HTMLElement>,
    userData: singleUserInfoType,
  ) => {
    // to stop immediately setting again the showSelectUserMenu to true
    e.stopPropagation();

    dispatch({ type: todoActions.SET_ACTIVE_USER_ID, userId: userData._id });
    setShowSelectUserMenu(false);
  };

  return (
    <header className="header">
      <section
        className="user-select-section"
        onClick={(e) => setShowSelectUserMenu(true)}>
        <label className="user-name">{activeUserData.name}</label>
        <div className="current-user-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        {showSelectUserMenu && (
          <ul className="user-select-menu">
            {Object.values(allUsers).map((user) => (
              <li key={user._id} onClick={(e) => onUserSelect(e, user)}>
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </header>
  );
};
