import React from 'react';

import './Dashboard.scss';

import {
  AllTodosCard,
  AssignedToYou,
  CreatedByYou,
  Reminders,
  Routine,
} from '../card';
import { Header } from './Header';

export const Dashboard = () => {
  return (
    <section className="dashboard">
      <Header />
      <AllTodosCard></AllTodosCard>
      <AssignedToYou></AssignedToYou>
      <CreatedByYou></CreatedByYou>
      <Reminders></Reminders>
      <Routine></Routine>
    </section>
  );
};
