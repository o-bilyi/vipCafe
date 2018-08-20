import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {navigationScheme} from 'core/index';
import connect from 'react-redux/es/connect/connect';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';

class AccountInfo extends React.Component {
  static propTypes = {
    userProfile: PropTypes.object
  };

  _logOut = () => {
    console.warn("log out");
  };

  render() {

    return(
      <div className="account-info-wrap">
        <div className="user-info">
          <h2 className="user-name">Тарасенко Петро</h2>
          <p className="user-email">tarasenko@gmail.com</p>
        </div>
        <Link to={navigationScheme.dashboard} className="go-to-dashboard">
          <span className="text">особистий кабінет</span>
          <SettingsIcon className="icon"/>
        </Link>
        <button onClick={this._logOut} className="log-aut">
          <span className="text">вийти з акаунту</span>
          <PowerIcon className="icon"/>
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
  };
};

export default connect(mapStateToProps)(AccountInfo);