import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './Card.scss';

import { singleTodoInfoType, todoStore } from '@/_reducer';
import { TodoRow } from '.';

interface CardType {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const Card = ({ children, title, className = '' }: CardType) => {
  return (
    <section className={`card ${className}`}>
      <header>
        <h3>{title}</h3>
      </header>
      <div className="card-body">{children}</div>
      <footer>
        <Link to={'expand-card'}>View all</Link>
      </footer>
    </section>
  );
};

export const CardCreateGroup = () => {
  return (
    <section className="card create-group">
      <div className="card-content-wrapper">
        <div className="card-add-icon">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <label>Create group</label>
      </div>
    </section>
  );
};

export const AllTodosCard = () => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <Card title="All todos" className="all-todos">
      <ul>
        {allTodosPerCard.map((singleTodo) => (
          <TodoRow
            key={singleTodo._id}
            todoInfo={singleTodo}
            extraDetailsRequired={true}
          />
        ))}
      </ul>
    </Card>
  );
};

export const AssignedToYou = () => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <Card title="Assigned to you">
      <ul>
        {allTodosPerCard.map((singleTodo) => (
          <TodoRow key={singleTodo._id} todoInfo={singleTodo} />
        ))}
      </ul>
    </Card>
  );
};

export const CreatedByYou = () => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <Card title="Created by you">
      <ul>
        {allTodosPerCard.map((singleTodo) => (
          <TodoRow key={singleTodo._id} todoInfo={singleTodo} />
        ))}
      </ul>
    </Card>
  );
};

export const Reminders = () => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <Card title="Reminders">
      <ul>
        {allTodosPerCard.map((singleTodo) => (
          <TodoRow key={singleTodo._id} todoInfo={singleTodo} />
        ))}
      </ul>
    </Card>
  );
};

export const Routine = () => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <Card title="Routine">
      <ul>
        {allTodosPerCard.map((singleTodo) => (
          <TodoRow key={singleTodo._id} todoInfo={singleTodo} />
        ))}
      </ul>
    </Card>
  );
};
