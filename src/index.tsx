import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import { Hello } from './components/hello';

import 'core-js/stable';

import 'regenerator-runtime/runtime';

const App = () => <Hello compiler="TypeScript" framework="React" />;
const AppWithHot = hot(module)(App);
const mountNode = document.getElementById('example');

ReactDOM.render(<AppWithHot />, mountNode);
