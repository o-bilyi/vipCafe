import React from 'react';
import App from './modules/App';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import { Provider } from 'react-redux';
import { AppContainer } from "react-hot-loader";
import { configureStore, history } from './core';
import { RouterService } from './shared/services';

export const store = configureStore();

RouterService.setStore(store);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App history={history}/>
    </Provider>
  </AppContainer>,
  document.getElementById('root'));