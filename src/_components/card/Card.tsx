import React from 'react';

import { singleTodoInfoType, todoStore } from '@/_reducer';
import { TodoRow } from '.';

export interface CardType {
  title: string;
  filterCriteria: string;
}

export const MonsterCard = ({ title, filterCriteria }: CardType) => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {allTodosPerCard.map((singleTodo) => (
          <TodoRow
            key={singleTodo._id}
            todoInfo={singleTodo}
            userIconRequired={true}
          />
        ))}
      </ul>
    </section>
  );
};

export const BabyCard = ({ title }: CardType) => {
  const [todoReducerState, dispatch] = todoStore();

  const allTodosPerCard: singleTodoInfoType[] = Object.values(
    todoReducerState.allTodos,
  );

  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {allTodosPerCard.map((singleTodo) => (
          <TodoRow
            key={singleTodo._id}
            todoInfo={singleTodo}
            userIconRequired={true}
          />
        ))}
      </ul>
    </section>
  );
};
