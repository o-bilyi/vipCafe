import React from 'react';
// import PropTypes from 'prop-types';
import 'moment/locale/uk';
import classNames from 'classnames';
import {Button} from '@material-ui/core';
import {DeviceSizeService,euroSymbol} from 'utilits';
import MomentLocaleUtils from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

const initialState = {
  date: {
    from: undefined,
    to: undefined,
  },
  selectItem: 0
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
];

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

  _selectItem = (id) => () => {
    this.setState({
      selectItem: id,
    });
  };

  _getHeadTab = () => {
    return items.map((item, key) => {
      const itemDate = <li className="list-date-wrap"><span className="list-date">{item.date}</span></li>;
      return (
        <ul className="list" key={key}>
          {itemDate}
          <li className={classNames('list-item', this.state.selectItem === item.id ? 'active' : '')}
              onClick={this._selectItem(key)}>
            <p className="number">№ {item.num}</p>
            <p className="title">{item.title}</p>
            <p className="order-address">Замовлення {item.orderAddress}</p>
          </li>
        </ul>
      );
    });
  };

  _getContentTab = () => {
    const selectItem = items.find((item) => item.id === this.state.selectItem);

    return selectItem.orders.map((item, key) => {
      if(DeviceSizeService.size.width > 1180) {
        return (
          <div className="item animated fadeInDown" key={key}>
            <div className="item-img-container">
              <img src={item.img} alt="item img" className="item-img"/>
            </div>
            <h2 className="item-title">{item.title}</h2>
            <p className="item-count">{item.count} шт.</p>
            <p className="item-price">{item.price}{euroSymbol}\шт.</p>
            <p className="item-all-price">{item.price}{euroSymbol}</p>
          </div>
        );
      }
      return (
        <div className="item animated fadeInDown" key={key}>
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

  render() {
    const {from, to} = this.state.date;
    const modifiers = {start: from, end: to};
    const selectItem = items.find((item) => item.id === this.state.selectItem);

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

              </div>
              <Button onClick={this._resetDateFilter} className="reset-date">очистити дату</Button>
            </div>
            <div className="archive-body">
              <div className="tab-left-column">
                {
                  this._getHeadTab()
                }
              </div>
              <div className="tab-right-column">
                <div className="tab-right-column-head">
                  <div className="order-number-wrap">
                    <div className="order-number-and-who-order">
                      <p className="title-order-number">Замовлення №: {selectItem.num}</p>
                      <p className="order-address">{selectItem.orderAddress}</p>
                    </div>
                    <div className="border"/>
                    <div className="all-price-wrap">
                      <p className="all-price-title">Сума замовлення:</p>
                      <p className="all-price-number">{'12 430'}{euroSymbol}</p>
                    </div>
                  </div>
                  <Button className="repeat-order">Повторити замовлення</Button>
                </div>

                <div className="goods-count">Товарів в замовленні: {items.length}</div>

                <div className="items-wrap">
                  <div className="scroll-container">
                    {
                      this._getContentTab()
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
