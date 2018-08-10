import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import {navigationScheme} from '../../../core';
import {userIsNotAuthenticated} from '../../../core/auth-redirect';

const initialState = {
  email : "",
  password : "",
  error : {
    email : null,
    password : null,
  },
};

const validation = {
  email : (val) => {
    let error = null;
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailValidation.test(val)) {
      error = "E-mail введений не вірно!";
    }
    return error;
  },
  password : (val) => {
    if (val.length < 4) {
      return "Не менше 4 символів!";
    }
    return null;
  }
};


class Login extends React.Component {

  state = initialState;

  onFieldsChange = event => {
    const errorText = validation[event.target.name](event.target.value);

    this.setState({
      [event.target.name] : event.target.value,
      error : {
        ...this.state.error,
        [event.target.name] : errorText,
      },
    });
  };


  handleSubmit = event => {
    event.preventDefault();

    const inputs = {
      user : this.state.user,
      site : this.state.site,
      email : this.state.email,
    };

    function status(response) {
      if (response.ok) {
        return Promise.resolve(response);
      }
      return Promise.reject(response.statusText);
    }

    fetch("/api/sendMessage", {
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      method : "post",
      body : JSON.stringify(inputs),
    }).then(status).then(() => {
      this.setState(initialState);
      toastr.success("Форма відправлена!");
    }).catch((error) => {
      toastr.warning("Помилка, повідомлення не відправлено!");
      console.error("Request failed", error);
    });
  };

  render() {
    const {email, password, error} = this.state;
    return (
      <div className="auth-page login">
        <form method="post" className="auth-form login-form" onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label htmlFor="#email">Телефон (або електронна адреса):</label>
            <input onChange={this.onFieldsChange}
                   value={email}
                   type="text"
                   name="email"
                   id="email"
                   className="form-input email"/>
            	{error.email && <p className="error-text">{error.email}</p>}
          </div>
          <div className="input-container">
            <label htmlFor="#password">Пароль:</label>
            <input onChange={this.onFieldsChange}
                   value={password}
                   type="password"
                   name="password"
                   id="password"
                   className="form-input password"/>
            	{error.password && <p className="error-text">{error.password}</p>}
            <p className="forgot-password">
              <Link className="forgot-password-link" to={navigationScheme.forgotPassword}>Забули пароль?</Link>
            </p>
          </div>
          <div className="button-container">
            <button type="submit">Увійти</button>
          </div>
        </form>
      </div>
    )
  }
}
export default userIsNotAuthenticated(Login)
