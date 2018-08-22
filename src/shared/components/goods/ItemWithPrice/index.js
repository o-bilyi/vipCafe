import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import ADBIcon from '@material-ui/icons/Adb';

export default class Item extends React.Component {
  static propTypes = {
    items : PropTypes.object
  };

  _addToBasket = () => {
    console.warn("add");
  };

  render() {
    const item = this.props.items;
    return (
      <div className='item-wrap'>

        <div className='item-image-wrap'>
          <img className='item-image' src={item.img} alt='item-img'/>
        </div>

        <h2 className='item-title'>{item.title}</h2>

        <div className='item-properties-wrap'>

          <div className="item-types">
            <div className='item-properties'>
              <ADBIcon className='icon'/>
              <span className='text'>капсульна</span>
            </div>
            <div className='item-properties'>
              <ADBIcon className='icon'/>
              <span className='text'>капсульна</span>
            </div>
          </div>

          <div className="in-the-package">
            <div className='item-properties'>
              <ADBIcon className='icon'/>
              <span className='text'>в упаковці {item.number} капсул</span>
            </div>
          </div>

        </div>

        <div className="item-number-and-price">

          <span className="price-text">К-сть:</span>
          <input type="number" min="0" className="count"/>
          <span className="total-price">= {120} &#8364;</span>

        </div>

        <Button onClick={this._addToBasket} className="add-to-basket">додати в кошик</Button>

      </div>
    )
  }
}