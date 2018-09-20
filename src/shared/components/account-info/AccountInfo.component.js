import React from 'react';
import PropTypes from 'prop-types';
import {store} from '../../../index';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {navigationScheme} from 'core/index';
import {Dialog,Button} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {clearBasket, logoutAction} from 'core/actions';

import SettingsIcon from 'assets/svg/settings.svg';
import PowerIcon from 'assets/svg/shut-down.svg';

class AccountInfo extends React.Component {
  static propTypes = {
    userProfile: PropTypes.object,
    logoutAction: PropTypes.func,
    isAuthorized: PropTypes.bool,
  };

  state = {
    openConfirmModal : false
  };

  _toggleConfirmModal = () => {
    this.setState({
      openConfirmModal : !this.state.openConfirmModal
    })
  };

  _logOut = () => {
    this.props.logoutAction();
    store.dispatch(clearBasket());
  };

  _getContent = () => {
    if(this.props.isAuthorized) {
      return (
        <div className="account-info-wrap">
          <div className="user-info">
            <h2 className="user-name">Тарасенко Петро</h2>
            <p className="user-email">tarasenko@gmail.com</p>
          </div>
          <Link to={navigationScheme.dashboard} className="go-to-dashboard">
            <span className="text">особистий кабінет</span>
            <SettingsIcon className="icon"/>
          </Link>
          <button onClick={this._toggleConfirmModal} className="log-aut">
            <span className="text">вийти з акаунту</span>
            <PowerIcon className="icon"/>
          </button>

          <Dialog
            open={this.state.openConfirmModal}
            onClose={this._toggleConfirmModal}
            className="modal-confirm"
            PaperProps={{
              className : "modal-confirm-wrap"
            }}
            aria-labelledby="simple-dialog-title"
          >
            <h3 className="modal-confirm-title">Ви дійсно бажаєте вийти з акаунту?</h3>
            <div className="button-container">
              <Button className="modal-confirm-btn-confirm" onClick={this._logOut}>Так</Button>
              <Button className='modal-confirm-btn-cancel' onClick={this._toggleConfirmModal}>Ні</Button>
            </div>
          </Dialog>

        </div>
      )
    }
    return null
  };

  render() {
    return this._getContent()
  }
}
const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    isAuthorized: state.auth.isAuthorized,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logoutAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);