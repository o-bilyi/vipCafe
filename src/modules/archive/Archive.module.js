import React from 'react';
import 'moment/locale/uk';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {Button} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {DeviceSizeService, euroSymbol} from 'utilits';
import MomentLocaleUtils from 'react-day-picker/moment';
import RouterService from 'shared/services/RouterService';
import OrderHeader from './components/OrderHeader.component';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

const initialState = {
  date: {
    from: undefined,
    to: undefined,
  },
  selectItem: 0,
  load : false,
  orders : []
};

const items = [
  {
    id: 0,
    date: '28.05.18',
    num: 14176,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    orderAddress: 'для Віктора з Вінниці',
    orders: [
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 1,
        price: 12,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 10,
        price: 23,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 20,
        price: 50,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 1,
        price: 12,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 10,
        price: 23,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 20,
        price: 50,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 1,
        price: 12,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 10,
        price: 23,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 20,
        price: 50,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 1,
        price: 12,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 10,
        price: 23,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 20,
        price: 50,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 1,
        price: 12,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 10,
        price: 23,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 20,
        price: 50,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 1,
        price: 12,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 10,
        price: 23,
      },
      {
        img: 'img/img-item.png',
        title: 'Lavazza Crema e Aroma Espresso Blue',
        count: 20,
        price: 50,
      },
    ],
  },
].map(i => {
  i.id = Math.random();
  return i;
});

export const onRepeatOrderClick = (item) => {
  console.warn('repeat order ', item);
};

class ArchiveOfOrders extends React.Component {
  static propTypes = {
   orders : PropTypes.object
  };

  state = initialState;

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
    this._getOrders()
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  _getOrders = () => {
    if (this.props.orders.items.length) {
      this.setState({
        orders : this.props.orders.items,
        load : true
      })
    }
  };

  handleChange = (direction) => (value) => {
    this.setState({
      date: {
        ...this.state.date,
        [direction]: value,
      },
    });
  };

  _resetDateFilter = () => {
    this.setState(initialState);
  };

  _selectItem = (index) => () => {
    if (DeviceSizeService.size.width < 680) {
      RouterService.navigateTo({
        pathname: navigationScheme.archiveOrder,
        state: items[index],
      });
      return;
    }
    this.setState({
      selectItem: index,
    });
  };

  _getHeadTab = () => {
    const orders = this.props.orders.items;
    const isNotMobile = DeviceSizeService.size.width > 680;
    return orders.length && orders.map((item, key) => {
      const itemDate = <li className="list-date-wrap"><span className="list-date">{item.order_date}</span></li>;
      const classes = classNames('list-item', {
        active : isNotMobile && this.state.selectItem === key
      });
      return (
        <ul className="list" key={item.ID}>
          {itemDate}
          <li className={classes}
              onClick={this._selectItem(key)}>
            <p className="number">№ {item.order_total}</p>
            <p className="title">{item.order_name}</p>
            <p className="order-address">Замовлення {item.order_mail}</p>
          </li>
        </ul>
      );
    });
  };

  _key = 0;
  get uniqueKey() {
    return this._key++;
  }

  _getItemsTab = () => {
    const selectItem = this.props.orders.items[this.state.selectItem];
    return selectItem.product.map((item) => {
      return (
        <div className="item animated fadeInDown" key={this.uniqueKey}>
          <div className="left-block">
            <img src={items[0].orders[0].img} alt="item img" className="item-img"/>
          </div>
          <div className="right-block">
            <h2 className="item-title">{item.title}</h2>
            <p className="item-count">{item.quality} шт.</p>
            <p className="item-price">{item.price}{euroSymbol}\шт.</p>
            <p className="item-all-price">{item.price}{euroSymbol}</p>
          </div>
        </div>
      );
    });
  };

  _getContent = () => {
    const selectItem = this.props.orders.items[this.state.selectItem];
    if (DeviceSizeService.size.width < 680) {
      return;
    }
    return (
      <div className="tab-right-column">
        {
          <OrderHeader
            allPrice={123}
            num={selectItem.ID}
            orderAddress={selectItem.order_mail}
            onRepeatOrderClick={() => onRepeatOrderClick(selectItem)}
          />
        }
        <div className="goods-count">Товарів в замовленні: {items.length}</div>
        <div className="items-wrap">
          <div className="scroll-container">
            {
              this._getItemsTab()
            }
          </div>
        </div>
      </div>
    );
  };

  _getBody = () => {
    const {from, to} = this.state.date;
    const modifiers = {start: from, end: to};

    return (
      <div className="archive-wrap">
        <div className="archive-head">
          <div className="search">
            <label htmlFor="search" className="label">Пошук по номеру чи назві:</label>
            <input
              placeholder="141"
              type="search"
              className="search-input"
            />
          </div>
          <div className="date-wrap">
            <span className="label">Пошук за період:</span>

            <div className="date-input-wrap">
              <DayPickerInput
                value={from}
                format="LL"
                placeholder="--  --  --"
                dayPickerProps={{
                  selectedDays: [from, {from, to}],
                  disabledDays: {after: to},
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 1,
                  locale: 'uk',
                  localeUtils: MomentLocaleUtils,
                }}
                onDayChange={this.handleChange('from')}
              />
            </div>

            <span className="arrow">/</span>

            <div className="date-input-wrap">
              <DayPickerInput
                value={to}
                format="LL"
                placeholder="--  --  --"
                ref={el => (this.to = el)}
                dayPickerProps={{
                  selectedDays: [from, {from, to}],
                  disabledDays: {before: from},
                  modifiers,
                  month: from,
                  fromMonth: from,
                  numberOfMonths: 1,
                  locale: 'uk',
                  localeUtils: MomentLocaleUtils,
                }}
                onDayChange={this.handleChange('to')}
              />
            </div>
            <Button onClick={this._resetDateFilter} className="reset-date">очистити дату</Button>
          </div>
        </div>
        <div className="archive-body">
          <div className="tab-left-column">
            {
              this._getHeadTab()
            }
          </div>
          {
            this._getContent()
          }
        </div>
      </div>
    )
  };

  render() {
    console.warn(this.state.load);
    return (
      <Wrapper>
        <div className="archive-page">
          { this.state.load && this._getBody()}
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders : state.archive
  }
};

export default connect(mapStateToProps)(ArchiveOfOrders);