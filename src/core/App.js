import WOW from 'wowjs';
import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router';
import ReduxToastr from 'react-redux-toastr';
import {generateRoutes, MAIN_ROUTES} from './index';
import {ConnectedRouter} from 'react-router-redux';

export default class App extends React.PureComponent {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
  };

  componentDidMount() {
    this.initWow();
  }

  initWow = () => {
    new WOW.WOW(
      {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 300,
        mobile: false,
        live: false,
      },
    ).init();
  };

  render() {
    return (
      <div className="global-component">
        <ConnectedRouter history={this.props.history}>
          <Switch>
            {generateRoutes(MAIN_ROUTES)}
          </Switch>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar/>
        </ConnectedRouter>
      </div>
    );
  }
}
