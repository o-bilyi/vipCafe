import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import Item from './components/Item.component';
import ItemMobile from './components/ItemMobile.component';
import {DeviceSizeService, euroSymbol} from 'utilits/index';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

class Basket extends React.Component {
  static propTypes = {
    items : PropTypes.array,
    allPrice : PropTypes.number,
    discount : PropTypes.number
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  getAllPrice = (price, count) => {
    return price * count;
  };

  _getDiscountPrice = () => {
    if (this.props.allPrice !== 0) {
      return this.props.allPrice * this.props.discount / 100;
    }
    return 0
  };

  _getContent = () => {
    const {items, allPrice, discount} = this.props;

    if(!items.length) {
      return <div className="basket-wrap is-empty"><h1 className="basket-is-empty">Корзина порожня.</h1></div>;
    }else {
      if (DeviceSizeService.size.width > 768) {
        return (
          <div className="basket-wrap">
            <div className="width-container">
              <div className="max-height">
                <table className="basket-table">
                  <thead>
                  <tr>
                    <th className="basket-title title-and-count">В кошику: {items.length}</th>
                    <th className="basket-title basket-title-empty"/>
                    <th className="basket-title">Кількість шт. (кг)</th>
                    <th className="basket-title">Ціна за шт. (кг)</th>
                    <th className="basket-title">Заг. вартість</th>
                  </tr>
                  </thead>
                  <tbody className="table-body">
                  {
                    items.map((item, key) => {
                      return (
                        <Item
                          key={key}
                          id={item.id}
                          img={item.img}
                          title={item.title}
                          count={item.count}
                          properties={item.properties}
                          getAllPrice={this.getAllPrice}
                          price={item.price}
                        />
                      );
                    })
                  }
                  </tbody>
                </table>
              </div>
              <div className="buttons-and-all-price-wrap">
                <div className="buttons-wrap">
                  <Button className="clear-basket">очистити кошик</Button>
                  <Button className="to-order">оформити замовлення</Button>
                </div>
                <div className="price-wrap">
                  <h5 className="discount">
                    <span className="discount-text">Ваша знижка: <span className="percent">{discount}%</span></span>
                    <span className="discount-in-euro">{this._getDiscountPrice()}{euroSymbol}</span>
                  </h5>
                  <h2 className="all-price-wrap">
                    <span className="all-price-text">Всього до оплати:</span>
                    <span className="all-price-number">{allPrice}{euroSymbol}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else {
        return (
          <div className="basket-wrap basket-mobile-wrap">
            <div className="width-container">
              <div className="buttons-and-all-price-wrap">
                <div className="price-wrap">
                  <h5 className="discount">
                    <span className="discount-text">Ваша знижка: <span className="percent">{discount}%</span></span>
                    <span className="discount-in-euro">{this._getDiscountPrice()}{euroSymbol}</span>
                  </h5>
                  <h2 className="all-price-wrap">
                    <span className="all-price-text">Всього до оплати:</span>
                    <span className="all-price-number">{allPrice}{euroSymbol}</span>
                  </h2>
                </div>
                <div className="buttons-wrap">
                  <Button className="clear-basket">очистити кошик</Button>
                  <Button className="to-order">оформити замовлення</Button>
                </div>
              </div>

              <div className="mobile-basket">
                <h3 className="basket-title title-and-count">В кошику: {items.length}</h3>
                {
                  items.map((item, key) => {
                    return (
                      <ItemMobile
                        key={key}
                        id={item.id}
                        img={item.img}
                        title={item.title}
                        count={item.count}
                        properties={item.properties}
                        getAllPrice={this.getAllPrice}
                        price={item.price}
                      />
                    );
                  })
                }
              </div>
            </div>
          </div>
        )
      }
    }
  };

  render() {
    return (
      <Wrapper>
        {
          this._getContent()
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.basket.items,
    allPrice : state.basket.price,
    discount : state.userProfile.discount
  };
};

export default connect(mapStateToProps)(Basket)
