import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import {FormControlLabel, TextField,Checkbox,Select, MenuItem, withStyles} from '@material-ui/core';
import AllPriceAndButtons from 'shared/components/all-price-and-buttons/AllPriceAndButtons.component';

import PhoneIcon from 'assets/svg/other/phone.svg';
import PointIcon from 'assets/svg/other/point.svg';
import EmailIcon from 'assets/svg/navigation-menu/envelope.svg';

const initialState = {
  name: '',
  surName: '',
  lastName: '',

  userDataIsSimilarToTheRecipient: false,

  city: '',
  delivery: '',
  department: '',

  openCitySelect: false,
  openDeliverySelect: false,
  openDepartmentSelect: false,

  error: {
    name: null,
    surName: null,
    lastName: null,

    city: null,
    delivery: null,
    department: null,
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
    '&$selected': {
      color: '#fff',
      backgroundColor: '#78ae59',
    },
  },

  selected: {},

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

const cityItems = ['Чернівці', 'Львів', 'Київ'];

const departmentItems = ['12', '18', '16'];

class CheckoutPage extends React.Component {
  static propTypes = {
    allPrice : PropTypes.number,
    userProfile : PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  state = initialState;

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

  fieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * select functionality
   */

  _getSelectItems = items => items.map((item, key) => {
    return <MenuItem
      key={key}
      style={styles.menuItemStyle}
      value={item}>{item}</MenuItem>;
  });

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  /**
   * select functionality
   */

  /**
   * checkbox functionality
   */

  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  /**
   * checkbox functionality
   */

  render() {
    const {
      name,
      surName,
      lastName,

      userDataIsSimilarToTheRecipient,

      city,
      delivery,
      department,

      openCitySelect,
      openDeliverySelect,
      openDepartmentSelect,
      error,
    } = this.state;

    const {classes, allPrice} = this.props;

    const discount = this.props.userProfile.discount;

    return (
      <Wrapper>
        <div className="checkout-order-page">
          <div className="width-container">
            <div className="user-information">
              <div className="name-wrap">
                <p className="user-name">Тарасенко Петро</p>
                <p className="user-shop-name">«Coffeemania»</p>
              </div>
              <div className="phone-wrap">
                <PhoneIcon className="phone-icon"/>
                <span className="phone-text">+38 066 345 87 14</span>
              </div>
              <div className="email-wrap">
                <EmailIcon className="email-icon"/>
                <span className="email-text">tarasenko@gmail.com</span>
              </div>
              <div className="location-wrap">
                <PointIcon className="location-icon"/>
                <span className="location-text">Городенка, Тернопільська обл.</span>
              </div>
            </div>
            <form className="checkout-form">

              <div className="left-block">
                <div className="input-container input-container-name">
                  <label className="form-label" htmlFor="#name">Ім’я отримувача:*</label>
                  <TextField
                    onChange={this.requiredFields}
                    required
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
                  <label className="form-label" htmlFor="#surName">Прізвище отримувача:*</label>
                  <TextField
                    onChange={this.requiredFields}
                    required
                    value={surName}
                    type="text"
                    name="surName"
                    id="surName"
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
                  <label className="form-label" htmlFor="#lastName">По-батькові отримувача:*</label>
                  <TextField
                    onChange={this.requiredFields}
                    required
                    value={lastName}
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
                  {error.lastName && <p className="error-text">{error.lastName}</p>}
                </div>

                <div className="input-container input-container-delivery">
                  <label className="form-label" htmlFor="#tradeFormat">Спосіб доставки:*</label>
                  <Select
                    value={delivery}
                    aria-haspopup="true"
                    className="form-input"
                    style={styles.selectStyle}
                    open={openDeliverySelect}
                    SelectDisplayProps={{className: 'select-label'}}
                    onChange={this.handleChangeSelect('delivery')}
                    onOpen={() => this.handleOpenSelect('openDeliverySelect')}
                    onClose={() => this.handleCloseSelect('openDeliverySelect')}>
                    {
                      this._getSelectItems(deliveryItems)
                    }
                  </Select>
                </div>

                <div className="input-container input-container-delivery">
                  <label className="form-label" htmlFor="#tradeFormat">Місто отримувача:*</label>
                  <Select
                    value={city}
                    aria-haspopup="true"
                    className="form-input"
                    style={styles.selectStyle}
                    open={openCitySelect}
                    SelectDisplayProps={{className: 'select-label'}}
                    onChange={this.handleChangeSelect('city')}
                    onOpen={() => this.handleOpenSelect('openCitySelect')}
                    onClose={() => this.handleCloseSelect('openCitySelect')}>
                    {
                      this._getSelectItems(cityItems)
                    }
                  </Select>
                </div>

                <div className="input-container input-container-department">
                  <label className="form-label" htmlFor="#tradeFormat">Відділення:*</label>
                  <Select
                    value={department}
                    aria-haspopup="true"
                    className="form-input"
                    style={styles.selectStyle}
                    open={openDepartmentSelect}
                    SelectDisplayProps={{className: 'select-label'}}
                    onChange={this.handleChangeSelect('department')}
                    onOpen={() => this.handleOpenSelect('openDepartmentSelect')}
                    onClose={() => this.handleCloseSelect('openDepartmentSelect')}>
                    {
                      this._getSelectItems(departmentItems)
                    }
                  </Select>
                </div>

              </div>

              <div className="right-block">
                <FormControlLabel
                  className="checkbox-label viber"
                  control={
                    <Checkbox
                      checked={userDataIsSimilarToTheRecipient}
                      onChange={this.handleChange('userDataIsSimilarToTheRecipient')}
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Дані користувача аналогічні для отримувача"
                  classes={{
                    label: 'label',
                  }}
                />
              </div>

            </form>

            {
              <AllPriceAndButtons
                allPrice={allPrice}
                discount={discount}
                checkOrder={false}
              />
            }
          </div>
        </div>
      </Wrapper>
    )
  }
}
const mapStateToProps = state => {
  return {
    allPrice : state.basket.price,
    userProfile : state.userProfile
  };
};

export default connect(mapStateToProps)(withStyles(styles)(CheckoutPage))