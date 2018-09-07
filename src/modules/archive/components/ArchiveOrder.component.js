import React from 'react';
import PropTypes from 'prop-types';
import {euroSymbol} from 'utilits';
import OrderHeader from './OrderHeader.component';
import {onRepeatOrderClick} from '../Archive.module';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

export default class MobileItem extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        id: PropTypes.any,
        num: PropTypes.number,
        date: PropTypes.string,
        title: PropTypes.string,
        orders: PropTypes.array,
        orderAddress: PropTypes.string,
      }),
    }),
  };

  constructor(props) {
    super(props);

    this.item = props.location.state;
  }

  _getContentTab = () => {
    return this.item.orders.map((item, key) => {
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
    return (
      <Wrapper>
        <div className="archive-page">
          <div className="archive-wrap">
            <div className="tab-right-column">

              {
                <OrderHeader
                  allPrice={123}
                  num={this.item.num}
                  orderAddress={this.item.orderAddress}
                  onRepeatOrderClick={() => onRepeatOrderClick(this.item)}
                />
              }

              <div className="goods-count">Товарів в замовленні: {this.item.length}</div>

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
      </Wrapper>
    );
  }
}
