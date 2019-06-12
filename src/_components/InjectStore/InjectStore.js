// @flow

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Field } from 'react-final-form';
import type { StoreT } from 'store';
import s from './InjectStore.scss';

type Props = {
  store: StoreT,
};

type State = {
  isShowStore: boolean,
};

@inject('store')
@observer
class InjectStore extends React.PureComponent<Props, State> {
  injectNewStore = (rawStore: StoreT) => {
    if (!rawStore) return;
    const newStore = JSON.parse(rawStore);
    const { store } = this.props || {};
    const { buildFromJson } = store;
    buildFromJson(newStore);
  };

  validateJSON = (value: string): ?string => {
    try {
      if (!value) return null;
      const json = JSON.parse(value);
      if (typeof json === 'object') return null;
      return 'Invalid JSON!';
    } catch (e) {
      return 'Invalid JSON!';
    }
  };

  render() {
    return (
      <div className={s.root}>
        <Form
          validateOnBlur
          onSubmit={v => this.injectNewStore(v.store)}
          render={({ handleSubmit }) => (
            <>
              <button className={s.injectBtn} type="button" onClick={handleSubmit}>
                Inject store
              </button>
              <Field
                name="store"
                validate={this.validateJSON}
                render={({ input, meta }) => (
                  <>
                    {meta.error && meta.touched && <span className={s.errorMsg}>{meta.error}</span>}
                    <textarea rows={15} cols={35} {...input} />
                  </>
                )}
              />
            </>
          )}
        />
      </div>
    );
  }
}

export default InjectStore;
