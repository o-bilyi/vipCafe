import React from 'react';
import Logo from './assets/svg/logo.svg';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo className="App-logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
