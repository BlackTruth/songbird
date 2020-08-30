import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/App';

import 'core-js/stable';

import 'regenerator-runtime/runtime';

const mountNode = document.getElementById('root');

ReactDOM.render(<App />, mountNode);
