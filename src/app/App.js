// @flow

import * as React from 'react';
import Container from '_components/Container/Container';
import s from './App.scss';

const App = () => {
  const example = {
    type: 'container',
    items: [
      { type: 'box', color: '#ffffff' },
      { type: 'container', items: [{ type: 'box', color: 'sdc' }] },
    ],
  };
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Container container={example} />
      </div>
    </div>
  );
};

export default App;
