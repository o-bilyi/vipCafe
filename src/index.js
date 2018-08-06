import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
