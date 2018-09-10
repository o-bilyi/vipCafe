import React from 'react';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr';
import {withStyles} from '@material-ui/core/styles';
import connect from 'react-redux/es/connect/connect';
import {userIsAuthenticated} from 'core/auth-redirect';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import {Button,Select,MenuItem,Checkbox,FormControlLabel, TextField} from '@material-ui/core';

const initialState = {
  name: '',
  surName: '',
  lastName: '',
  mobile: '',
  email: '',
  nameCompany: '',
  city: '',
  delivery: '',
  tradeFormat: '',
  sitePage: '',
  telegram: false,
  viber: false,
  openThanksModal: false,
  openDeliverySelect: false,
  openTradeFormatSelect: false
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

const deliveryItems = [];

const tradeFormatItems = [];

class Dashboard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    userProfile: PropTypes.object,
  };

  state = initialState;

  fieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

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

    fetch('/api/userProfile', {
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
   * customSelect functionality
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
   * customSelect functionality
   */

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
      openTradeFormatSelect
    } = this.state;

    return (
      <div className="shared-form-wrap">
        <form autoComplete="off" method="post" className="shared-form" onSubmit={this.handleSubmit}>
          <div className="shared-form-container">
            <div className="input-container input-container-name">
              <label className="form-label" htmlFor="#name">Ім’я:</label>
              <TextField
                autoComplete="off"
                onChange={this.fieldsChange}
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

            <div className='input-container input-container-mobile'>
              <label className="form-label" htmlFor="#mobile">Телефон:</label>
              <TextField
                onChange={this.fieldsChange}
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

          <div className="button-container">
            <Button
              onClick={this.handleOpenThanksModal}
              className="submit-button"
              variant="extendedFab"
              aria-label="signUp"
              type="submit">Зберегти зміни</Button>
          </div>
        </form>
      </div>
    );

  };

  render() {
    return (
      <Wrapper>
        <div className="dashboard-page">
          {
            this._getContent()
          }
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
  };
};

export default  connect(mapStateToProps)(userIsAuthenticated(withStyles(styles)(Dashboard)));
