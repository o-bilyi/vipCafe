import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router';
import ReduxToastr from 'react-redux-toastr';
import {generateRoutes, MAIN_ROUTES} from '../core';
import { ConnectedRouter } from 'react-router-redux';

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
  };

  render() {
    return (
      <Fragment>
        <ConnectedRouter history={this.props.history}>
          <Switch>
            {generateRoutes(MAIN_ROUTES)}
          </Switch>
        </ConnectedRouter>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar/>
      </Fragment>
    );
  }
}
