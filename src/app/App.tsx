import React, { useState } from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Header from '../components/header/Header';
import Game from '../components/game/Game';

import './app.module.scss';
import { Buttons } from '../constants/strings';

export interface HelloProps {
  compiler: string;
  framework: string;
}

const sections: string[] = Object.keys(Buttons).map((key) => `/${key}`);

export const App: React.FC = () => (
  <>
    <Router>
      <Header />
      <Route path="/" exact>
        <Redirect to="/warmup" />
      </Route>
      <Switch>
        <Route path={sections} exact component={Game} />

      </Switch>
    </Router>
  </>
);
