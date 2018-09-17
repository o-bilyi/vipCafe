import React from 'react';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr';
import connect from 'react-redux/es/connect/connect';
import {userIsAuthenticated} from 'core/auth-redirect';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import CustomSelect from 'shared/components/customSelect/Select.component';
import CustomCheckbox from 'shared/components/custom-checkbox/CustomCheckbox.component';
import {Button, TextField} from '@material-ui/core';

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
};

const deliveryItems = ['Нова Пошта', 'Міст Експрес'];

const cityItems = ['Чернівці', 'Львів', 'Київ'];

const tradeFormatSelect = ['Ларьок', 'Бокс', 'Прилавок'];

class Dashboard extends React.Component {
  static propTypes = {
    userProfile: PropTypes.object
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

  handleChangeCheckbox = name => event => {
    this.setState({[name]: event.target.checked});
  };

  /**
   * checkbox functionality
   */

  /**
   * handleChangeSelect functionality
   */

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  /**
   * handleChangeSelect functionality
   */


  _getContent = () => {
    const {
      name, surName,
      lastName, mobile,
      email, nameCompany,

      city,
      delivery,
      tradeFormat,

      sitePage,
      telegram,
      viber,
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
              <CustomSelect
                items={cityItems}
                labelText="Місто"
                selectedItem={city}
                handleChangeSelect={this.handleChangeSelect("city")}
              />
            </div>

            <div className="input-container input-container-delivery">
              <CustomSelect
                items={deliveryItems}
                labelText="Доставка:"
                selectedItem={delivery}
                handleChangeSelect={this.handleChangeSelect("delivery")}
              />
            </div>

            <div className="input-container input-container-tradeFormat">
              <CustomSelect
                items={tradeFormatSelect}
                labelText="Формат торгівлі:"
                selectedItem={tradeFormat}
                handleChangeSelect={this.handleChangeSelect("tradeFormat")}
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

export default connect(mapStateToProps)(userIsAuthenticated((Dashboard)));
