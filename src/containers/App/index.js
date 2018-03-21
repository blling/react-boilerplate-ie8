/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import HomePage from 'containers/HomePage/loadable';
import CounterPage from 'containers/CounterPage/loadable';
import NotFoundPage from 'containers/NotFoundPage/loadable';

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/counter" component={CounterPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}
