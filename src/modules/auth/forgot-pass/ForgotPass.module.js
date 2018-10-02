import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {navigationScheme} from 'core';
import {DeviceSizeService} from 'utilits';
import {Button, TextField} from '@material-ui/core';

import LogoIconSVG from 'assets/svg/logo.svg';

export default class ForgotPass extends React.Component {
  state = {
    email: ''
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  onFieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

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

  _getContent = () => {
    const {email} = this.state;
    if (DeviceSizeService.size.width < 1025) {
      return (
        <div className="auth-page shared-form-wrap login">
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
            <h1 className="title-page">Скинути пароль</h1>
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
            </div>
            <div className="button-container">
              <Button
                className="submit-button"
                type="submit">Скинути</Button>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="auth-page shared-form-wrap login">
        <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="auth-form shared-form">
          <img src="/img/clover.png" className="auth-form-clover" alt="clover"/>
          <h1 className="title-page">Скинути пароль</h1>
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
          </div>

          <div className="button-container">
            <Button
              className="submit-button"
              type="submit">Скинути</Button>
          </div>
        </form>
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
    );
  };

  render() {
    return this._getContent();
  }
}
