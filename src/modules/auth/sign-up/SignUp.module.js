import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {toastr} from 'react-redux-toastr';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {navigationScheme} from '../../../core';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import {DeviceSizeService} from '../../../utilits';
import LogoIconSVG from '../../../assets/svg/logo.svg';
import {FormControlLabel, TextField} from '@material-ui/core';

const initialState = {
  name: '',
  surName: '',
  lastName: '',
  mobile: '',
  email: '',
  nameCompany: '',
  city: '',
  delivery: 'Нова Пошта',
  tradeFormat: 'Ларьоооок',
  sitePage: '',
  telegram: false,
  viber: false,
  openThanksModal: false,
  openDeliverySelect: false,
  openTradeFormatSelect: false,
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

const styles = {
  root: {
    borderRadius: 0,
  },

  checked: {},

  checkbox: {
    color: '#fff',

    '&$checked': {
      color: '#fff',
    },

    width: 20,
    height: 20,
  },

  sizeIcon: {
    fontSize: 20,
  },

  menuItemStyle: {
    fontSize: '13px',
    color: '#494949',
  },

  selectStyle: {
    alignItems: 'center',
    height: '40px',
  },
};

const deliveryItems = ['Нова Пошта', 'Міст Експрес'];

const tradeFormatItems = ['Ларьоооок', 'Базар', 'Інет магаз'];

class SignUp extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

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
      })
      .catch((error) => {
        toastr.warning('Помилка, повідомлення не відправлено!');
        console.error('Request failed', error);
      });
  };

  /**
   * checkbox functionality
   */

  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  /**
   * checkbox functionality
   */

  /**
   * select functionality
   */

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleCloseSelect = name => {
    this.setState({[name]: false});
  };

  handleOpenSelect = name => {
    this.setState({[name]: true});
  };

  _getSelectItems = items => items.map((item, key) => {
    return <MenuItem
      key={key}
      style={styles.menuItemStyle}
      value={item}>{item}</MenuItem>;
  });

  /**
   * select functionality
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

  _goToPlatform = () => navigationScheme.catalog;

  _getContent = () => {
    const {classes} = this.props;

    const {
      name, surName,
      lastName, mobile,
      email, nameCompany,
      city, delivery,
      tradeFormat, sitePage,
      telegram, viber,
      openDeliverySelect,
      openTradeFormatSelect,
      error,
    } = this.state;

    if (DeviceSizeService.size.width < 1025) {
      return (
        <div className="auth-page signUp">
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

          <form autoComplete="off" method="post" className="auth-form signUp-form" onSubmit={this.handleSubmit}>
            <h1 className="title-page">Реєстрація акаунту</h1>
            <div className="signUp-form-container">
              <div className={`input-container input-container-name ${error.name ? 'error' : ''}`}>
                <label className="form-label" htmlFor="#name">Ім’я:</label>
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
                <label className="form-label" htmlFor="#mobile">Телефон:</label>
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

              <div className={`input-container input-container-city ${error.city ? 'error' : ''}`}>
                <label className="form-label" htmlFor="#city">Місто:</label>
                <TextField
                  required
                  id="city"
                  type="text"
                  name="city"
                  value={city}
                  placeholder="Чернівці"
                  className="form-input-wrap"
                  onChange={this.fieldsChange}
                  InputProps={{
                    classes: {
                      root: 'form-input',
                      input: 'input-style',
                    },
                  }}/>
                {error.city && <p className="error-text">{error.city}</p>}
              </div>

              <div className="input-container input-container-delivery">
                <label className="form-label" htmlFor="#delivery">Доставка:</label>
                <Select
                  value={delivery}
                  aria-haspopup="true"
                  className="form-input"
                  open={openDeliverySelect}
                  style={styles.selectStyle}
                  onChange={this.handleChangeSelect('delivery')}
                  SelectDisplayProps={{className: 'select-label'}}
                  onOpen={() => this.handleOpenSelect('openDeliverySelect')}
                  onClose={() => this.handleCloseSelect('openDeliverySelect')}
                >
                  {
                    this._getSelectItems(deliveryItems)
                  }
                </Select>
              </div>

              <div className="input-container input-container-tradeFormat">
                <label className="form-label" htmlFor="#tradeFormat">Формат торгівлі:</label>
                <Select
                  value={tradeFormat}
                  aria-haspopup="true"
                  className="form-input"
                  style={styles.selectStyle}
                  open={openTradeFormatSelect}
                  SelectDisplayProps={{className: 'select-label'}}
                  onChange={this.handleChangeSelect('tradeFormat')}
                  onOpen={() => this.handleOpenSelect('openTradeFormatSelect')}
                  onClose={() => this.handleCloseSelect('openTradeFormatSelect')}>
                  {
                    this._getSelectItems(tradeFormatItems)
                  }
                </Select>
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
                <FormControlLabel
                  className="checkbox-label telegram"
                  control={
                    <Checkbox
                      checked={telegram}
                      onChange={this.handleChange('telegram')}
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Telegram"
                  classes={{
                    label: 'label',
                  }}
                />
                <FormControlLabel
                  className="checkbox-label viber"
                  control={
                    <Checkbox
                      checked={viber}
                      onChange={this.handleChange('viber')}
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Viber"
                  classes={{
                    label: 'label',
                  }}
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
                variant="extendedFab"
                aria-label="signUp"
                type="submit">зареєструвати</Button>
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

          <Dialog
            fullScreen
            scroll={'paper'}
            classes={{
              paperFullScreen: 'thanks-modal-bg',
            }}
            open={this.state.openThanksModal}
            onClose={this.handleCloseThanksModal}
          >
            <div className="thanks-modal-wrap">
              <div className="thanks-modal">
                <h2 className="title-page">Дякуємо за заявку <img src="/img/clover.png" className="clover-img" alt="clover"/></h2>
                <p className="short-description">З Вами зв’яжеться менеджер для уточнення <br/> данних на підтвердження реєстрації.</p>
                <div className="separate"/>
                <p className="short-description">до підтвердження реєстрації Ви можете переглянути сайт <br/> без можливості переглядати ціни та
                  оформлювати замовлення:</p>
                <div className="button-container">
                  <Button
                    onClick={this._goToPlatform}
                    className="go-to-platform" aria-label="go-to-platform"
                    type="button">переглянути сайт</Button>
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
    return (
      <div className="auth-page signUp">
        <form autoComplete="off"
              method="post" className="auth-form signUp-form" onSubmit={this.handleSubmit}>
          <img src="/img/clover.png" className="auth-form-clover" alt="clover"/>
          <h1 className="title-page">Реєстрація акаунту</h1>

          <div className="signUp-form-container">
            <div className={`input-container input-container-name ${error.name ? 'error' : ''}`}>
              <label className="form-label" htmlFor="#name">Ім’я:</label>
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
              <label className="form-label" htmlFor="#mobile">Телефон:</label>
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

            <div className={`input-container input-container-city ${error.city ? 'error' : ''}`}>
              <label className="form-label" htmlFor="#city">Місто:</label>
              <TextField
                required
                id="city"
                type="text"
                name="city"
                value={city}
                placeholder="Чернівці"
                className="form-input-wrap"
                onChange={this.fieldsChange}
                InputProps={{
                  classes: {
                    root: 'form-input',
                    input: 'input-style',
                  },
                }}/>
              {error.city && <p className="error-text">{error.city}</p>}
            </div>

            <div className="input-container input-container-delivery">
              <label className="form-label" htmlFor="#delivery">Доставка:</label>
              <Select
                value={delivery}
                aria-haspopup="true"
                className="form-input"
                open={openDeliverySelect}
                style={styles.selectStyle}
                onChange={this.handleChangeSelect('delivery')}
                SelectDisplayProps={{className: 'select-label'}}
                onOpen={() => this.handleOpenSelect('openDeliverySelect')}
                onClose={() => this.handleCloseSelect('openDeliverySelect')}
              >
                {
                  this._getSelectItems(deliveryItems)
                }
              </Select>
            </div>

            <div className="input-container input-container-tradeFormat">
              <label className="form-label" htmlFor="#tradeFormat">Формат торгівлі:</label>
              <Select
                value={tradeFormat}
                aria-haspopup="true"
                className="form-input"
                style={styles.selectStyle}
                open={openTradeFormatSelect}
                SelectDisplayProps={{className: 'select-label'}}
                onChange={this.handleChangeSelect('tradeFormat')}
                onOpen={() => this.handleOpenSelect('openTradeFormatSelect')}
                onClose={() => this.handleCloseSelect('openTradeFormatSelect')}>
                {
                  this._getSelectItems(tradeFormatItems)
                }
              </Select>
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
              <FormControlLabel
                className="checkbox-label telegram"
                control={
                  <Checkbox
                    checked={telegram}
                    onChange={this.handleChange('telegram')}
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checked,
                    }}
                  />
                }
                label="Telegram"
                classes={{
                  label: 'label',
                }}
              />
              <FormControlLabel
                className="checkbox-label viber"
                control={
                  <Checkbox
                    checked={viber}
                    onChange={this.handleChange('viber')}
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checked,
                    }}
                  />
                }
                label="Viber"
                classes={{
                  label: 'label',
                }}
              />
            </div>
          </div>

          <p className="privacy-policy">Натискаючи “Зареєструвати” Ви погоджуєтесь з
            <Link className="privacy-policy-link" to={navigationScheme.privacyPolicy}>політикою конфіденційності.</Link>
            Після реєстрації з Вами зв’яжеться менеджер.</p>

          <div className="button-container">
            <Button onClick={this.handleOpenThanksModal} className="submit-button" variant="extendedFab" aria-label="signUp"
                    type="submit">зареєструвати</Button>
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
                <Button
                  onClick={this._goToPlatform}
                  className="go-to-platform" aria-label="go-to-platform"
                  type="button">переглянути сайт</Button>
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

  };

  render() {
    return (
      this._getContent()
    );
  }
}

export default withStyles(styles)(SignUp);
