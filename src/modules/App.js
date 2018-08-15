import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router';
import ReduxToastr from 'react-redux-toastr';
import {ConnectedRouter} from 'react-router-redux';
import {generateRoutes, MAIN_ROUTES} from '../core';
import connect from 'react-redux/es/connect/connect';

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.bool,
    store: PropTypes.object,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    console.warn(this.props.auth);
  }

  render() {
    return (
      <div className="app">
        <ConnectedRouter history={this.props.history}>
          <Switch>
            {generateRoutes(MAIN_ROUTES)}
          </Switch>
        </ConnectedRouter>
        <ReduxToastr
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="bounceInDown"
          transitionOut="bounceOutUp"
          progressBar={false}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthorized,
  };
};

export default connect(mapStateToProps)(App);