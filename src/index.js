import React from 'react';
import App from './modules/App';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import { Provider } from 'react-redux';
import { configureStore, history } from './core';
import { RouterService } from './shared/services';
import {loginSuccess} from './core/actions';

export const store = configureStore();

RouterService.setStore(store);
const check = async () => {
  return new Promise(res => {
    setTimeout(() => {
      store.dispatch(loginSuccess());
      res(true);
    }, 2000)
  })
};
check().then(res => {
  console.log(res);
  ReactDOM.render(
    <Provider store={store}>
      <App history={history}/>
    </Provider>,
    document.getElementById('root'));
});
