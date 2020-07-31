import React from 'react';

import Header from '../components/header/Header';

import './app.module.scss';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const App: React.FC = () => (
  <>
    <Header score={11} />
  </>
);
