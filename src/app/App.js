// @flow

import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Container from '_components/Container/Container';
import s from './App.scss';

@inject('store')
@observer
class App extends React.PureComponent<> {
  render() {
    const { store } = this.props;
    const { rootContainer } = store;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Container container={rootContainer} />
        </div>
      </div>
    );
  }
}

export default App;
