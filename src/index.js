import React from 'react';
import App from './core/App';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import {Provider } from 'react-redux';
import { configureStore, history } from 'core';
import { AppContainer } from "react-hot-loader";
import { RouterService } from './shared/services';

export const store = configureStore();

RouterService.setStore(store);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App history={history} store={store}/>
    </Provider>
  </AppContainer>,
  document.getElementById('root'));
