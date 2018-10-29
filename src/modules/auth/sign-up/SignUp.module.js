import React from 'react';
import {navigationScheme} from 'core';
import {Link} from 'react-router-dom';
import {toastr} from 'react-redux-toastr';
import {DeviceSizeService} from 'utilits';
import {Dialog, Button, TextField} from '@material-ui/core';

import LogoIconSVG from 'assets/svg/logo.svg';

import CustomSelect from 'shared/components/customSelect/Select.component';
import CustomMultiSelect from 'shared/components/customSelect/MultiSelect.component';
import CustomCheckbox from 'shared/components/custom-checkbox/CustomCheckbox.component';

const initialState = {
  name: '',
  surName: '',
  lastName: '',
  mobile: '',
  email: '',
  nameCompany: '',

  city: '',
  delivery: [],
  tradeFormat: '',

  sitePage: '',
  telegram: false,
  viber: false,
  openThanksModal: false,

  error: {
    name: null,
    mobile: null,
    city: null,
  },
};

const validation = {
  name: (val) => {
    if (val.length < 3) {
      return 'Не менше 3 символів!';
    }
    return null;
  },
  mobile: (val) => {
    if (val.length < 10 || val.length > 13) {
      return 'Не менше 4 символів та не більше 13!';
    }
    return null;
  },
  city: (val) => {
    if (val.length.length < 3) {
      return 'Введіть місто';
    }
    return null;
  },
};

const deliveryItems = ['Нова Пошта', 'Міст Експрес'];

const cityItems = ['Чернівці', 'Львів', 'Київ'];

const tradeFormatSelect = ['Ларьок', 'Бокс', 'Прилавок'];

export default class SignUp extends React.Component {
  state = initialState;

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  fieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * check required fields functionality
   */

  requiredFields = event => {
    const errorText = validation[event.target.name](event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      error: {
        ...this.state.error,
        [event.target.name]: errorText,
      },
    });
  };

  /**
   * check required fields functionality
   */

  handleSubmit = event => {
    event.preventDefault();

    const {
      name,
      surName,
      lastName,
      mobile,
      email,
      nameCompany,
      city,
      delivery,
      tradeFormat,
      sitePage,
      telegram,
      viber,
    } = this.state;

    const inputs = {
      name,
      surName,
      lastName,
      mobile,
      email,
      nameCompany,
      city,
      delivery,
      tradeFormat,
      sitePage,
      telegram,
      viber,
    };

    function status(response) {
      if (response.ok) {
        return Promise.resolve(response);
      }
      return Promise.reject(response.statusText);
    }

    fetch('/api/signUp', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(inputs),
    })
      .then(status)
      .then(() => {
        this.setState(initialState);
        toastr.success('Форма відправлена!');
        // setArchive();
      })
      .catch((error) => {
        toastr.warning('Помилка, повідомлення не відправлено!');
        console.error('Request failed', error);
      });
  };

  /**
   * handleChangeSelect functionality
   */

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  /**
   * handleChangeSelect functionality
   */

  /**
   * thanks modal functionality
   */

  handleOpenThanksModal = () => {
    this.setState({openThanksModal: true});
  };

  handleCloseThanksModal = () => {
    this.setState({openThanksModal: false});
  };

  /**
   * thanks modal functionality
   */

  /**
   * checkbox functionality
   */

  handleChangeCheckbox = name => event => {
    this.setState({[name]: event.target.checked});
  };

  /**
   * checkbox functionality
   */

  _getForm = () => {
    const {
      name,
      surName,
      lastName,
      mobile,
      email,
      nameCompany,

      city,
      delivery,
      tradeFormat,

      sitePage,
      telegram,
      viber,
      error,
    } = this.state;
    return (
      <form key={5} autoComplete="off" method="post" className="auth-form shared-form" onSubmit={this.handleSubmit}>
        <h1 className="title-page">Реєстрація акаунту</h1>
        <div className="shared-form-container">
          <div className={`input-container input-container-name ${error.name ? 'error' : ''}`}>
            <label className="form-label" htmlFor="#name">Ім’я: <sup className="required-field">*</sup></label>
            <TextField
              autoComplete="off"
              onChange={this.requiredFields}
              required
              placeholder="Боб"
              value={name}
              type="text"
              name="name"
              id="name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: 'form-input',
                  input: 'input-style',
                },
              }}/>
            {error.name && <p className="error-text">{error.name}</p>}
          </div>

          <div className="input-container input-container-surName">
            <label className="form-label" htmlFor="#name">Прізвище:</label>
            <TextField
              onChange={this.fieldsChange}
              required
              placeholder="Боб"
              value={surName}
              type="text"
              name="name"
              id="name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: 'form-input',
                  input: 'input-style',
                },
              }}/>
            {error.surName && <p className="error-text">{error.surName}</p>}
          </div>

          <div className="input-container input-container-lastName">
            <label className="form-label" htmlFor="#lastName">По-батькові:</label>
            <TextField
              onChange={this.fieldsChange}
              value={lastName}
              placeholder="Бобіков"
              type="text"
              name="lastName"
              id="lastName"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: 'form-input',
                  input: 'input-style',
                },
              }}/>
          </div>

          <div className={`input-container input-container-mobile ${error.mobile ? 'error' : ''}`}>
            <label className="form-label" htmlFor="#mobile">Телефон: <sup className="required-field">*</sup></label>
            <TextField
              onChange={this.requiredFields}
              required
              value={mobile}
              placeholder="+380"
              type="number"
              name="mobile"
              id="mobile"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: 'form-input',
                  input: 'input-style',
                },
              }}/>
            {error.mobile && <p className="error-text">{error.mobile}</p>}
          </div>

          <div className="input-container input-container-email">
            <label className="form-label" htmlFor="#mobile">Електронна адреса:</label>
            <TextField
              id="email"
              name="email"
              type="email"
              value={email}
              className="form-input-wrap"
              onChange={this.fieldsChange}
              placeholder="coffeeman@gmail.com"
              InputProps={{
                classes: {
                  root: 'form-input',
                  input: 'input-style',
                },
              }}/>
          </div>

          <div className="input-container input-container-nameCompany">
            <label className="form-label" htmlFor="#nameCompany">Назва компанії:</label>
            <TextField
              onChange={this.fieldsChange}
              value={nameCompany}
              placeholder="lariok.com"
              type="text"
              name="nameCompany"
              id="nameCompany"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: 'form-input',
                  input: 'input-style',
                },
              }}/>
          </div>

          <div className='input-container input-container-city'>
            <CustomSelect
              requiredFiled
              items={cityItems}
              labelText="Місто"
              selectedItem={city}
              handleChangeSelect={this.handleChangeSelect('city')}
            />
          </div>

          <div className="input-container input-container-delivery">
            <label className="form-label" htmlFor="#nameCompany">Доставка:</label>
            <CustomMultiSelect
              items={deliveryItems}
              selectedItem={delivery}
              countTheSelectedItem={false}
              handleChangeSelect={this.handleChangeSelect('delivery')}
            />
          </div>

          <div className="input-container input-container-tradeFormat">
            <CustomSelect
              items={tradeFormatSelect}
              labelText="Формат торгівлі:"
              selectedItem={tradeFormat}
              handleChangeSelect={this.handleChangeSelect('tradeFormat')}
            />
          </div>

          <div className="input-container input-container-sitePage">
            <label className="form-label" htmlFor="#sitePage">Сайт:</label>
            <TextField
              onChange={this.fieldsChange}
              value={sitePage}
              placeholder="LariOK"
              type="text"
              name="sitePage"
              id="sitePage"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: 'form-input',
                  input: 'input-style',
                },
              }}/>
          </div>

          <div className="input-container-telegram-and-viber">
            <p className="telegram-and-viber-title">На вказаному телефоні є:</p>
            <CustomCheckbox
              handleChangeCheckbox={this.handleChangeCheckbox('viber')}
              checked={viber}
              className='viber'
              labelText='Viber'
            />

            <CustomCheckbox
              handleChangeCheckbox={this.handleChangeCheckbox('telegram')}
              checked={telegram}
              className='telegram'
              labelText='Telegram'
            />
          </div>
        </div>

        <p className="privacy-policy">Натискаючи “Зареєструвати” Ви погоджуєтесь з
          <Link className="privacy-policy-link" to={navigationScheme.privacyPolicy}>політикою конфіденційності.</Link>
          Після реєстрації з Вами зв’яжеться менеджер.</p>

        <div className="button-container">
          <Button
            onClick={this.handleOpenThanksModal}
            className="submit-button"
            aria-label="signUp"
            variant="extendedFab"
            type="submit">зареєструвати</Button>
        </div>

        <div className="registered-link-wrap">
          <Link
            to={navigationScheme.login}
            className="registered-link">Вже зареєстровані?
            <span className="underline">Увійти в акаунт</span></Link>
        </div>
      </form>
    )
  };


  _getContent = () => {
    if (DeviceSizeService.size.width < 1025) {
      return [
        <div key={1} className="auth-header-mobile">
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
        </div>,

        this._getForm(),

        <div key={3} className="continue-without-authorization">
          <Link
            to={navigationScheme.catalog}
            className="continue-without-authorization-link">
            Продовжити без авторизації</Link>
        </div>,
      ];
    }
    return [
      this._getForm(),

      <div key={2} className="continue-without-authorization">
        <Link
          to={navigationScheme.catalog}
          className="continue-without-authorization-link">
          Продовжити без авторизації</Link>
      </div>,

      <div key={3} className="contacts-block">
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
      </div>,
    ];

  };

  render() {
    return (
      <div className="auth-page shared-form-wrap">
        {this._getContent()}
        <Dialog
          fullScreen
          open={this.state.openThanksModal}
          onClose={this.handleCloseThanksModal}
          classes={{
            paperFullScreen: 'thanks-modal-bg',
          }}
        >
          <div className="thanks-modal-wrap">
            <div className="thanks-modal">
              <h2 className="title-page">Дякуємо за заявку <img src="/img/clover.png" className="clover-img" alt="clover"/></h2>
              <p className="short-description">З Вами зв’яжеться менеджер для уточнення <br/> данних на підтвердження реєстрації.</p>
              <div className="separate"/>
              <p className="short-description">до підтвердження реєстрації Ви можете переглянути сайт <br/> без можливості переглядати ціни та
                оформлювати замовлення:</p>
              <div className="button-container">
                <Link
                  to={navigationScheme.catalog}
                  className="go-to-platform" aria-label="go-to-platform">
                  переглянути сайт</Link>
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
        </Dialog>
      </div>
    );
  }
}
