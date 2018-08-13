import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import {navigationScheme} from '../../../core';
import LogoIconSVG from '../../../assets/svg/logo.svg';

const initialState = {
  name : "",
  surName : "",
  lastName : "",
  mobile : "",
  email : "",
  nameCompany : "",
  city : "",
  delivery : "",
  tradeFormat : "",
  sitePage : "",
  telegram : false,
  viber : false,
  error : {
    name : null,
    mobile : null,
    city : null
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

export default class SignUp extends React.Component {

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

    fetch("/api/signUp", {
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      method : "post",
      body : JSON.stringify(inputs),
    }).then(status)
    .then(() => {
      this.setState(initialState);
      toastr.success("Форма відправлена!");
    })
    .catch((error) => {
      toastr.warning("Помилка, повідомлення не відправлено!");
      console.error("Request failed", error);
    });
  };

  render() {
    const {
      name, surName,
      lastName,mobile,
      email, nameCompany,
      city, delivery,
      tradeFormat,sitePage,
      telegram,viber,
      error} = this.state;
    return (
      <div className="auth-page login">
        <form method="post" className="auth-form login-form" onSubmit={this.handleSubmit}>
          <img src="/img/clover.png" className="auth-form-clover" alt="clover"/>
          <h1 className="title-page">Реєстрація акаунтунт</h1>

          <div className={`input-container input-container-name ${error.name}`}>
            <label className="form-label" htmlFor="#name">Ім’я:</label>
            <input onChange={this.onFieldsChange}
                   required="required"
                   placeholder="Боб"
                   value={name}
                   type="text"
                   name="name"
                   id="name"
                   className="form-input"/>
            {error.name && <p className="error-text">{error.name}</p>}
          </div>

          <div className="input-container input-container-lastName">
            <label className="form-label" htmlFor="#lastName">По-батькові:</label>
            <input onChange={this.onFieldsChange}
                   value={lastName}
                   placeholder="Бобіков"
                   type="text"
                   name="lastName"
                   id="lastName"
                   className="form-input"/>
          </div>

          <div className={`input-container input-container-mobile ${error.mobile}`}>
            <label className="form-label" htmlFor="#mobile">Телефон:</label>
            <input onChange={this.onFieldsChange}
                   value={mobile}
                   placeholder="+380"
                   type="text"
                   name="mobile"
                   id="mobile"
                   className="form-input"/>
            {error.mobile && <p className="error-text">{error.mobile}</p>}
          </div>

          <div className="input-container input-container-email">
            <label className="form-label" htmlFor="#mobile">Електронна адреса:</label>
            <input onChange={this.onFieldsChange}
                   value={email}
                   placeholder="coffeeman@gmail.com"
                   type="email"
                   name="email"
                   id="email"
                   className="form-input"/>
            {error.email && <p className="error-text">{error.email}</p>}
          </div>

          <div className="input-container input-container-email">
            <label className="form-label" htmlFor="#nameCompany">Назва компанії:</label>
            <input onChange={this.onFieldsChange}
                   value={nameCompany}
                   placeholder="lariok.com"
                   type="text"
                   name="nameCompany"
                   id="nameCompany"
                   className="form-input"/>
          </div>

          <div className={`input-container input-container-city ${error.city}`}>
            <label className="form-label" htmlFor="#city">Місто:</label>
            <input onChange={this.onFieldsChange}
                   value={city}
                   placeholder="Чернівці"
                   type="text"
                   name="city"
                   id="city"
                   className="form-input"/>
            {error.city && <p className="error-text">{error.city}</p>}
          </div>

          <div className="input-container input-container-delivery">
            <label className="form-label" htmlFor="#delivery">Доставка:</label>
            <input onChange={this.onFieldsChange}
                   value={delivery}
                   placeholder="Нова Пошта, Міст Експрес..."
                   type="text"
                   name="delivery"
                   id="delivery"
                   className="form-input"/>
          </div>

          <div className="input-container input-container-tradeFormat">
            <label className="form-label" htmlFor="#tradeFormat">Формат торгівлі:</label>
            <input onChange={this.onFieldsChange}
                   value={tradeFormat}
                   placeholder="Ларьоооок"
                   type="text"
                   name="tradeFormat"
                   id="tradeFormat"
                   className="form-input"/>
          </div>

          <div className="input-container input-container-sitePage">
            <label className="form-label" htmlFor="#sitePage">Сайт:</label>
            <input onChange={this.onFieldsChange}
                   value={sitePage}
                   placeholder="Ларьоооок"
                   type="text"
                   name="sitePage"
                   id="sitePage"
                   className="form-input"/>
          </div>

          <div className="input-container input-container-telegram-and-viber">
            <p className="telegram-and-viber-title">На вказаному телефоні є:</p>
            <label className="checkbox-label telegram" htmlFor="#telegram">
              <input onChange={this.onFieldsChange}
                     value={telegram}
                     type="checkbox"
                     name="telega"
                     id="telega"
                     className="form-check-box"/>
              <span className="checkbox-text">Telegram</span>
            </label>
            <label className="checkbox-label viber" htmlFor="#viber">
              <input onChange={this.onFieldsChange}
                     value={viber}
                     type="checkbox"
                     name="viber"
                     id="viber"
                     className="form-check-box"/>
              <span className="checkbox-text">Viber</span>
            </label>
          </div>

          <p className="privacy-policy">Натискаючи “Зареєструвати” Ви погоджуєтесь з
            <Link className="privacy-policy-link" to={navigationScheme.privacyPolicy}>політикою конфіденційності</Link>.
            Після реєстрації з Вами зв’яжеться менеджер.</p>

          <div className="button-container">
            <button className="submit-button" type="submit">зареєструвати</button>
          </div>

          <div className="registered-link-wrap">
            <Link
              to={navigationScheme.login}
              className="registered-link">Вже зареєстровані?
              <span className="underline">Увійти в акаунт</span></Link>
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
    )
  }
}
