import React from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Header from '../components/header/Header';
import AudioCard from '../components/audioCard/AudioCard';

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
      <Header score={11} />
      <Route path="/" exact>
        <Redirect to="/warmup" />
      </Route>
      <Switch>
        <Route path={sections} exact>
          <AudioCard
            imageUrl="https://www.freevector.com/uploads/vector/preview/15564/FreeVector-Happy-Bird.jpg"
            audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            name="Name"
            latin="Latin"
            description="Description"
            isFull
          />
        </Route>
      </Switch>
    </Router>
  </>
);
