import React from 'react';

import {
  AllTodosCard,
  AssignedToYou,
  CreatedByYou,
  Reminders,
  Routine,
} from '../card';

export const Dashboard = () => {
  return (
    <section>
      <header>Dashboard</header>
      <AllTodosCard></AllTodosCard>
      <AssignedToYou></AssignedToYou>
      <CreatedByYou></CreatedByYou>
      <Reminders></Reminders>
      <Routine></Routine>
    </section>
  );
};
