import React from 'react';

import './Dashboard.scss';

import {
  AllTodosCard,
  AssignedToYou,
  CardCreateGroup,
  CreatedByYou,
  Reminders,
  Routine,
} from '../card';

export const Dashboard = () => {
  return (
    <section className="dashboard">
      <section className="dashboard-body">
        <section className="column single">
          <AllTodosCard></AllTodosCard>
        </section>
        <section className="column double">
          <AssignedToYou></AssignedToYou>
          <CreatedByYou></CreatedByYou>
          <Reminders></Reminders>
          <Routine></Routine>
        </section>
        <section className="column double">
          <CardCreateGroup />
        </section>
      </section>
    </section>
  );
};
