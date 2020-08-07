import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import { App } from './app/App';

import 'core-js/stable';

import 'regenerator-runtime/runtime';

const app = () => <App />;
// const AppWithHot = hot(module)(app);
const mountNode = document.getElementById('root');

ReactDOM.render(<App />, mountNode);
