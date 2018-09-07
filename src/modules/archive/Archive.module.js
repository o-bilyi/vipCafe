import React from 'react';
// import PropTypes from 'prop-types';
import 'moment/locale/uk';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {Button} from '@material-ui/core';
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
  {
    id: 1,
    date: '28.06.18',
    num: 14177,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    orderAddress: 'Замовлення для Віктора з Вінниці',
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
    ],
  },
  {
    id: 2,
    date: '28.07.18',
    num: 14178,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    orderAddress: 'Замовлення для Віктора з Вінниці',
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
    ],
  },
  {
    id: 3,
    date: '28.06.18',
    num: 14178,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    orderAddress: 'Замовлення для Віктора з Вінниці',
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
    ],
  },
  {
    id: 4,
    date: '28.05.18',
    num: 14178,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    orderAddress: 'Замовлення для Віктора з Вінниці',
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
    ],
  },
].map(i => {
  i.id = new Date().getTime();
  return i;
});


export const onRepeatOrderClick = (item) => {
  console.warn('repeat order ', item);
};

export default class ArchiveOfOrders extends React.Component {
  state = initialState;

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

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
    const isNotMobile = DeviceSizeService.size.width > 680;
    return items.map((item, key) => {
      const itemDate = <li className="list-date-wrap"><span className="list-date">{item.date}</span></li>;
      const classes = classNames('list-item', {
        active : isNotMobile && this.state.selectItem === key
      });
      return (
        <ul className="list" key={item.id}>
          {itemDate}
          <li className={classes}
              onClick={this._selectItem(key)}>
            <p className="number">№ {item.num}</p>
            <p className="title">{item.title}</p>
            <p className="order-address">Замовлення {item.orderAddress}</p>
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
    const selectItem = items[this.state.selectItem];

    return selectItem.orders.map((item) => {
      return (
        <div className="item animated fadeInDown" key={this.uniqueKey}>
          <div className="left-block">
            <img src={item.img} alt="item img" className="item-img"/>
          </div>
          <div className="right-block">
            <h2 className="item-title">{item.title}</h2>
            <p className="item-count">{item.count} шт.</p>
            <p className="item-price">{item.price}{euroSymbol}\шт.</p>
            <p className="item-all-price">{item.price}{euroSymbol}</p>
          </div>
        </div>
      );
    });
  };

  _getContent = () => {
    const selectItem = items[this.state.selectItem];
    if (DeviceSizeService.size.width < 680) {
      return;
    }
    return (
      <div className="tab-right-column">
        {
          <OrderHeader
            allPrice={123}
            num={selectItem.num}
            orderAddress={selectItem.orderAddress}
            onRepeatOrderClick={() => onRepeatOrderClick(items[this.state.selectItem])}
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

  render() {
    const {from, to} = this.state.date;
    const modifiers = {start: from, end: to};

    return (
      <Wrapper>
        <div className="archive-page">
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
        </div>
      </Wrapper>
    );
  }
}
