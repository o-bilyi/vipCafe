import React from 'react';
import ItemGoods from './ItemGoods.component';
import {Button} from '@material-ui/core';

export default class ItemWithPrice extends ItemGoods {
  getBottomContent = () => {
    return [
      <div key={1} className="item-number-and-price">

        <span className="price-text">К-сть:</span>

        <input
          type="number" min="1" className="count"
          value={this.state.countItem}
          onChange={(value) => this.countItem(value)}/>
        <span className="total-price">= {this.getTotalCost()} &#8364;</span>

      </div>,

      <Button key={2} onClick={this._addToBasket(this.props.id, this.state.countItem)} className="add-to-basket">додати в кошик</Button>
    ];
  }
}
