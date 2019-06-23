import React from 'react';
import PropTypes from 'prop-types';
import {euroSymbol} from 'utilits';
import OrderHeader from './OrderHeader.component';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import {store} from "../../../index";
import {getRepeatOrder} from "../../../core/actions/repeat-order";
import {toastr} from "react-redux-toastr";

export const onRepeatOrderClick = (id) => {
  store.dispatch(getRepeatOrder(id)).then(item => {
    if ((item.result)) {
      this.forceUpdate();
    } else {
      toastr.error('Замовлення відсутнє');
    }
  })
  console.warn('repeat order ', id);
};

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
    return this.item.product.map((item, key) => {
      return (
        <div className="item animated fadeInDown" key={key}>
          <div className="left-block">
            <img src={item.img} alt="item img" className="item-img"/>
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

  render() {
    return (
      <Wrapper>
        <div className="archive-page">
          <div className="archive-wrap">
            <div className="tab-right-column">

              {
                <OrderHeader
                  allPrice={123}
                  num={this.item.ID}
                  orderAddress={this.item.order_mail}
                  onRepeatOrderClick={() => onRepeatOrderClick(this.item.ID)}
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
