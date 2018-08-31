import React from 'react';
import {Button} from '@material-ui/core';
import Item from './components/Item.component';
import ItemMobile from './components/ItemMobile.component';
import {DeviceSizeService, euroSymbol} from 'utilits/index';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

const items = [
  {
    id : 1,
    img : 'img/img-item.png',
    title : 'Lavazza Crema e Aroma Espresso Blue',
    properties : ['капсульна','капсульна'],
    countItem : 1,
    priceWithOne : 20
  },
  {
    id : 2,
    img : 'img/img-item.png',
    title : 'Lavazza Crema e Aroma Espresso Blue',
    properties : ['капсульна','капсульна'],
    countItem : 3,
    priceWithOne : 40
  },
  {
    id : 3,
    img : 'img/img-item.png',
    title : 'Lavazza Crema e Aroma Espresso Blue',
    properties : ['капсульна','капсульна'],
    countItem : 5,
    priceWithOne : 25
  },
  {
    id : 4,
    img : 'img/img-item.png',
    title : 'Lavazza Crema e Aroma Espresso Blue',
    properties : ['капсульна','капсульна'],
    countItem : 5,
    priceWithOne : 25
  },
  {
    id : 5,
    img : 'img/img-item.png',
    title : 'Lavazza Crema e Aroma Espresso Blue',
    properties : ['капсульна','капсульна'],
    countItem : 5,
    priceWithOne : 25
  },
  {
    id : 6,
    img : 'img/img-item.png',
    title : 'Lavazza Crema e Aroma Espresso Blue',
    properties : ['капсульна','капсульна'],
    countItem : 5,
    priceWithOne : 25
  },
  {
    id : 7,
    img : 'img/img-item.png',
    title : 'Lavazza Crema e Aroma Espresso Blue',
    properties : ['капсульна','капсульна'],
    countItem : 5,
    priceWithOne : 25
  }
];

export default class Basket extends React.Component {
  state = {
    percent: 0,
    allPrice: 0
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
    const {allPrice, percent} = this.state;
    if (allPrice !== 0 && percent !== 0) {
      return allPrice * percent / 100;
    }
    return 0
  };

  _getContent = () => {
    const {allPrice,percent} = this.state;

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
                        countItem={item.countItem}
                        properties={item.properties}
                        getAllPrice={this.getAllPrice}
                        priceWithOne={item.priceWithOne}
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
                  <span className="discount-text">Ваша знижка: <span className="percent">{percent}%</span></span>
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

    return (
      <div className="basket-wrap basket-mobile-wrap">
       <div className="width-container">
         <div className="buttons-and-all-price-wrap">
           <div className="price-wrap">
             <h5 className="discount">
               <span className="discount-text">Ваша знижка: <span className="percent">{percent}%</span></span>
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
                   countItem={item.countItem}
                   properties={item.properties}
                   getAllPrice={this.getAllPrice}
                   priceWithOne={item.priceWithOne}
                 />
               );
             })
           }
         </div>
       </div>
      </div>
    )
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
