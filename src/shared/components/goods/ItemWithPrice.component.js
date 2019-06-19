import React from 'react';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {Link} from 'react-router-dom';
import {euroSymbol} from 'utilits/index';
import ItemGoods from './ItemGoods.component';

export default class ItemWithPrice extends ItemGoods {
  getBottomContent = () => {
    return (
      <React.Fragment>
        <div className="item-number-and-price">

          <span className="price-text">К-сть:</span>

          <input
            min="1"
            type="number"
            className="count"
            title="enter count"
            value={this.state.count}
            onChange={(value) => this.countItem(value)}
            maxLength={this.state.quantity}
          />
          <span className="total-price">= {this.getTotalCost()} {euroSymbol}</span>

        </div>

        <button
          title="add to basket"
          onClick={this._addToBasket(this.props)}
          disabled={this.state.count === 0 || this.state.count >= this.props.quantity}
          className={classNames("add-to-basket", this.props.id === this.state.wasAddedItem ? "success" : "")}>
          <span className="add-to-basket-text">додати в кошик</span>
          <Link to={navigationScheme.basket} title="open in basket" className="open-basket-text">відкрити в кошику</Link>
        </button>
      </React.Fragment>
    );
  }
}
