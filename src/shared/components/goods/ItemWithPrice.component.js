import React from 'react';
import ItemGoods from './ItemGoods.component';
import {Button} from '@material-ui/core';

export default class Item extends ItemGoods {
  getBottomContent = () => {
    const {id, priceWithOne} = this.props;
    return [
      <div key={1} className="item-number-and-price">

        <span className="price-text">К-сть:</span>
        <input type="number" min="0" className="count"/>
        <span className="total-price">= {priceWithOne} &#8364;</span>

      </div>,

      <Button key={2} onClick={this._addToBasket(id)} className="add-to-basket">додати в кошик</Button>
    ];
  }
}
