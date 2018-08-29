import React from 'react';
import {Button} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export default class Basket extends React.Component {
  state = {
    percent: 0,
    allPrice: 0,
    countItem: 1,
    priceWithOne: 20,
    countIsBasket: 1,
    discountInEuro: 15,
  };

  _changeCountItem = () => {

  };

  render() {
    const {
      countIsBasket, countItem,
      allPrice, priceWithOne, percent,
      discountInEuro,
    } = this.state;

    return (
      <Wrapper>
        <div className="basket-wrap">
          <div className="width-container">
            <table className="basket-table">
              <thead>
              <tr>
                <th className="basket-title title-and-count">В кошику: {countIsBasket}</th>
                <th className="basket-title basket-title-empty"/>
                <th className="basket-title">Кількість шт. (кг)</th>
                <th className="basket-title">Ціна за шт. (кг)</th>
                <th className="basket-title">Заг. вартість</th>
              </tr>
              </thead>
              <tbody className="table-body">
              <tr className="table-tr">
                <td className="buttons-and-img">
                  <div className="buttons">
                    <button className="remove-item"><ClearIcon className="icon"/></button>
                    <button className="copy-item"><FileCopyIcon className="icon"/></button>
                  </div>
                  <div className="image-wrap">
                    <img src="img/img-item.png" className="img-item" alt="img-item"/>
                  </div>
                </td>
                <td className="border-right">
                  <div className="title-and-properties">
                    <h2 className="title-item">Lavazza Crema e Aroma Espresso Blue</h2>
                    <div className="properties">
                      <p className="item-props">icon капсульна</p>
                      <p className="item-props">icon капсульна</p>
                    </div>
                  </div>
                </td>
                <td className="border-right">
                  <div className="count-item-wrap">
                    <button className="increment-item"><KeyboardArrowLeftIcon className="icon"/></button>
                    <input type="number" min={0} className="count-item" value={countItem}/>
                    <button className="decrement-item"><KeyboardArrowRightIcon className="icon"/></button>
                  </div>
                </td>
                <td className="price-with-one border-right">
                  {priceWithOne}
                  <EuroSymbolIcon className="icon"/>
                </td>
                <td className="all-price">
                  {allPrice}
                  <EuroSymbolIcon className="icon"/>
                </td>
              </tr>
              </tbody>
            </table>
            <div className="buttons-and-all-price-wrap">
              <div className="buttons-wrap">
                <Button className="clear-basket">очистити кошик</Button>
                <Button className="to-order">оформити замовлення</Button>
              </div>
              <div className="price-wrap">
                <h5 className="discount">
                  <span className="text">Ваша знижка: <span className="percent">{percent}</span></span>
                  <span className="discount-in-euro">{discountInEuro} <EuroSymbolIcon className="icon"/></span>
                </h5>
                <h2 className="all-price">
                  <span className="text">Всього до оплати:</span>
                  <span className="number">{allPrice}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
