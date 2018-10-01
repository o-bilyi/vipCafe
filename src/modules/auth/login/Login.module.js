import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {DeviceSizeService} from 'utilits';
// import {toastr} from 'react-redux-toastr';
import {loginAction} from 'core/actions/index';
import {TextField, Button} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {userIsNotAuthenticated} from 'core/auth-redirect';

import LogoIconSVG from 'assets/svg/logo.svg';

const initialState = {
  email: '',
  password: '',
  onAnimation: false,
  error: {
    email: null,
    password: null,
  },
};

const validation = {
  email: (val) => {
    let error = null;
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailValidation.test(val)) {
      error = 'E-mail введений не вірно!';
    }
    return error;
  },
  password: (val) => {
    if (val.length < 4) {
      return 'Не менше 4 символів!';
    }
    return null;
  },
};

class Login extends React.Component {
  static propTypes = {
    loginAction: PropTypes.func,
  };
  state = {
    ...initialState,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  onFieldsChange = event => {
    const errorText = validation[event.target.name](event.target.value);

    this.setState({
      [event.target.name]: event.target.value,
      error: {
        ...this.state.error,
        [event.target.name]: errorText,
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      onAnimation: true,
    });

    // function status(response) {
    //   if (response.ok) {
    //     return Promise.resolve(response);
    //   }
    //   return Promise.reject(response.statusText);
    // }
    //
    // fetch('/api/sendMessage', {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'post',
    //   body: JSON.stringify(inputs),
    // })
    //   .then(status)
    //   .then(() => {
    //     this.setState(initialState);
    //     toastr.success('Форма відправлена!');
    //   })
    //   .catch((error) => {
    //     toastr.error('Логін або Пароль не вірний!');
    //     console.error('Request failed', error);
    //   });
  };

  onTransitionEnd = () => {
    if (this.state.onAnimation) {
      setTimeout(() => {
        this.props.loginAction(this.state.email, this.state.password);
      }, 700);
    }

  };

  _getContent = () => {
    const {email, password, error} = this.state;
    const classes = classNames('animation-wrap shared-form-wrap', this.state.onAnimation ? 'login-animation' : '');
    if (DeviceSizeService.size.width < 1025) {
      return (
        <div className="auth-page login">
          <div onTransitionEnd={this.onTransitionEnd} className={classes}>
            <div className="auth-header-mobile">
              <div className="logo">
                <LogoIconSVG className="logo-icon-svg"/>
              </div>
              <div className="email-and-number">
                <a
                  className="email-link"
                  href="mailto:vipcafe@info">vipcafe@info</a>
                <div className="separator"/>
                <a
                  className="number-link"
                  href="tel:+38(095)3131313">+38 (095) 313 13 13</a>
              </div>
            </div>
            <form autoComplete="off" method="post" onSubmit={this.handleSubmit} className="auth-form shared-form">
              <h1 className="title-page">Вхід в акаунт</h1>
              <div className="input-container input-container-email">
                <label className="form-label" htmlFor="#email">Телефон (або електронна адреса):</label>
                <TextField onChange={this.onFieldsChange}
                           placeholder="test@gmail.com"
                           value={email}
                           type="text"
                           name="email"
                           id="email"
                           className="form-input-wrap"
                           InputProps={{
                             classes: {
                               root: 'form-input',
                               input: 'input-style',
                             },
                           }}/>
                {error.email && <p className="error-text">{error.email}</p>}
              </div>
              <div className="input-container input-container-password">
                <label className="form-label" htmlFor="#password">Пароль:</label>
                <TextField onChange={this.onFieldsChange}
                           value={password}
                           placeholder="******"
                           type="password"
                           name="password"
                           id="password"
                           className="form-input-wrap"
                           InputProps={{
                             classes: {
                               root: 'form-input',
                               input: 'input-style',
                             },
                           }}/>
                {error.password && <p className="error-text">{error.password}</p>}
              </div>
              <p className="forgot-password">
                <Link className="forgot-password-link" to={navigationScheme.forgotPassword}>Забули пароль?</Link>
              </p>
              <div className="button-container">
                <Button
                  onClick={() => this._onAnimation}
                  className="submit-button"
                  type="submit">Увійти</Button>
              </div>
              <div className="registered-link-wrap">
                <Link
                  to={navigationScheme.signUp}
                  className="registered-link">У Вас немає акаунту?
                  <span className="underline">Зареєструйтесь</span></Link>
              </div>
            </form>
            <div className="continue-without-authorization">
              <Link
                to={navigationScheme.catalog}
                className="continue-without-authorization-link">
                Продовжити без авторизації</Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="auth-page login">
        <div onTransitionEnd={this.onTransitionEnd} className={classes}>
          <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="auth-form shared-form">
            <img src="/img/clover.png" className="auth-form-clover" alt="clover"/>
            <h1 className="title-page">Вхід в акаунт</h1>
            <div className="input-container input-container-email">
              <label className="form-label" htmlFor="#email">Телефон (або електронна адреса):</label>
              <TextField onChange={this.onFieldsChange}
                         placeholder="test@gmail.com"
                         value={email}
                         type="text"
                         name="email"
                         id="email"
                         className="form-input-wrap"
                         InputProps={{
                           classes: {
                             root: 'form-input',
                             input: 'input-style',
                           },
                         }}/>
              {error.email && <p className="error-text">{error.email}</p>}
            </div>
            <div className="input-container input-container-password">
              <label className="form-label" htmlFor="#password">Пароль:</label>
              <TextField onChange={this.onFieldsChange}
                         value={password}
                         placeholder="******"
                         type="password"
                         name="password"
                         id="password"
                         className="form-input-wrap"
                         InputProps={{
                           classes: {
                             root: 'form-input',
                             input: 'input-style',
                           },
                         }}/>
              {error.password && <p className="error-text">{error.password}</p>}
            </div>
            <p className="forgot-password">
              <Link className="forgot-password-link" to={navigationScheme.forgotPassword}>Забули пароль?</Link>
            </p>
            <div className="button-container">
              <Button
                onClick={() => this._onAnimation}
                className="submit-button"
                type="submit">Увійти</Button>
            </div>
            <div className="registered-link-wrap">
              <Link
                to={navigationScheme.signUp}
                className="registered-link">У Вас немає акаунту?
                <span className="underline">Зареєструйтесь</span></Link>
            </div>
          </form>
          <div className="continue-without-authorization">
            <Link
              to={navigationScheme.catalog}
              className="continue-without-authorization-link">
              Продовжити без авторизації</Link>
          </div>
          <div className="contacts-block">
            <div className="logo">
              <LogoIconSVG className="logo-icon-svg"/>
            </div>
            <div className="separator"/>
            <div className="email-and-number">
              <a
                className="email-link"
                href="mailto:vipcafe@info">vipcafe@info</a>
              <a
                className="number-link"
                href="tel:+38(095)3131313">+38 (095) 313 13 13</a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this._getContent();
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loginAction,
  }, dispatch);
};

export default connect(undefined, mapDispatchToProps)(userIsNotAuthenticated(Login));
