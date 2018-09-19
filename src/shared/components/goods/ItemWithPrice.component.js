import React from 'react';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {Link} from 'react-router-dom';
import {euroSymbol} from 'utilits/index';
import ItemGoods from './ItemGoods.component';

export default class ItemWithPrice extends ItemGoods {
  getBottomContent = () => {
    return [
      <div key={1} className="item-number-and-price">

        <span className="price-text">К-сть:</span>

        <input
          type="number" min="1" className="count"
          value={this.state.count}
          onChange={(value) => this.countItem(value)}/>
        <span className="total-price">= {this.getTotalCost()} {euroSymbol}</span>

      </div>,

      <button key={2} onClick={this._addToBasket(this.props)} disabled={this.state.count === 0} className={classNames("add-to-basket",
        this.props.id === this.state.wasAddedItem ? "success" : "")}>
        <span className="add-to-basket-text">додати в кошик</span>
        <Link to={navigationScheme.basket} className="open-basket-text">відкрити в кошику</Link>
      </button>
    ];
  }
}
