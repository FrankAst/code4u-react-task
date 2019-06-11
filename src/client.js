// @flow

import * as React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import App from './app/App';
import store from './store';

const RootContainer = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(RootContainer, document.getElementById('root'));
