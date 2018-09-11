import React from 'react';
import PropTypes from 'prop-types';
import {euroSymbol} from 'utilits';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {navigationScheme} from 'core';
import {store} from '../../../index';
import {clearBasket} from 'core/actions';

export default function AllPriceAndButtons(props) {
  const {allPrice, discount, checkOrder} = props;

  const _getDiscountPrice = (price, discount) => price * discount / 100;

  const _getAllPriceWithDiscount = (price, discount) => allPrice - _getDiscountPrice(price, discount);

  const clearBasketAction = () => {
    store.dispatch(clearBasket());
  };

  const submitBasketAction = () => {
   return console.warn("sumit busket");
  };

  const _submitOrCheckOrder = () => {
    if(checkOrder) {
      return (
        <div className="buttons-wrap">
          <Button className="clear-btn" onClick={clearBasketAction}>очистити кошик</Button>
          <Link to={navigationScheme.checkoutOrder} className="to-order">оформити замовлення</Link>
        </div>
      )
    }
    return (
      <div className="buttons-wrap">
        <Link to={navigationScheme.basket} className="clear-btn">редагувати кошик</Link>
        <Button className="to-order" onClick={submitBasketAction}>підтвердити замовлення</Button>
      </div>
    )
  };

  return(
    <div className="all-price-and-buttons">
      {
        _submitOrCheckOrder()
      }
      <div className="price-wrap">
        <h5 className="discount">
          <span className="discount-text">
            Ваша знижка: <span className="percent">{discount}%</span>
          </span>
          <span className="discount-in-euro">
            {_getDiscountPrice(allPrice, discount)}{euroSymbol}
            </span>
        </h5>
        <h2 className="all-price-wrap">
          <span className="all-price-text">Всього до оплати:</span>
          <span className="all-price-number">
            {_getAllPriceWithDiscount(allPrice, discount)}{euroSymbol}
          </span>
        </h2>
      </div>
    </div>
  );
};

AllPriceAndButtons.propTypes = {
  allPrice : PropTypes.number,
  discount : PropTypes.number,
  checkOrder : PropTypes.bool
};