import React from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';

import { singleTodoInfoType, todoStore } from '@/_reducer';
import { TodoRow } from '.';

interface CardType {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const Card = ({ children, title, className }: CardType) => {
  return (
    <section className={`card ${className}`}>
      <header>
        <h3>{title}</h3>
      </header>
      <ul>{children}</ul>
      <footer>
        <Link to={'expand-card'}>View all</Link>
      </footer>
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
      {allTodosPerCard.map((singleTodo) => (
        <TodoRow
          key={singleTodo._id}
          todoInfo={singleTodo}
          userIconRequired={true}
        />
      ))}
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
      {allTodosPerCard.map((singleTodo) => (
        <TodoRow
          key={singleTodo._id}
          todoInfo={singleTodo}
          userIconRequired={false}
        />
      ))}
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
      {allTodosPerCard.map((singleTodo) => (
        <TodoRow
          key={singleTodo._id}
          todoInfo={singleTodo}
          userIconRequired={false}
        />
      ))}
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
      {allTodosPerCard.map((singleTodo) => (
        <TodoRow
          key={singleTodo._id}
          todoInfo={singleTodo}
          userIconRequired={false}
        />
      ))}
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
      {allTodosPerCard.map((singleTodo) => (
        <TodoRow
          key={singleTodo._id}
          todoInfo={singleTodo}
          userIconRequired={false}
        />
      ))}
    </Card>
  );
};
