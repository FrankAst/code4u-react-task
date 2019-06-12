// @flow

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import type { StoreT } from 'store';
import s from './ExtractStore.scss';

type Props = {
  store: StoreT,
};

type State = {
  isShowStore: boolean,
};

@inject('store')
@observer
class ExtractStore extends React.PureComponent<Props, State> {
  state: State = {
    isShowStore: false,
  };

  toggleShowStore = () => {
    const { isShowStore } = this.state;
    this.setState({ isShowStore: !isShowStore });
  };

  render() {
    const { store } = this.props || {};
    const { rootContainer } = store;
    const { isShowStore } = this.state || {};
    return (
      <div className={s.root}>
        <button className={s.toggleBtn} type="button" onClick={this.toggleShowStore}>
          {isShowStore ? 'Hide' : 'Show'} store
        </button>
        {isShowStore && (
          <pre className={s.jsonFormat}>{JSON.stringify(rootContainer, undefined, 4)}</pre>
        )}
      </div>
    );
  }
}

export default ExtractStore;
