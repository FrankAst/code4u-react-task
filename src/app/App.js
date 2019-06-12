// @flow

import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Container from '_components/Container/Container';
import ExtractStore from '_components/ExtractStore/ExtractStore';
import InjectStore from '_components/InjectStore/InjectStore';
import type { StoreT } from 'store';
import s from './App.scss';

type Props = {
  store: StoreT,
};

@inject('store')
@observer
class App extends React.PureComponent<Props, void> {
  render() {
    const { store } = this.props || {};
    const { rootContainer } = store;
    return (
      <div className={s.root}>
        <div className={s.block}>
          <Container container={rootContainer} />
        </div>
        <div className={s.storeControls}>
          <ExtractStore />
          <InjectStore />
        </div>
      </div>
    );
  }
}

export default App;
