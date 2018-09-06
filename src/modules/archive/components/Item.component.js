import React from 'react';
import PropTypes from 'prop-types';
// import Dialog from '@material-ui/core/Dialog';
import {DeviceSizeService, euroSymbol} from '../../../utilits';

export default class Item extends React.Component {
  static propTypes = {
    items : PropTypes.shape({

    })
  };
  state = {
    openModal : false,
  };

  _getContentTab = () => {
    const selectItem = this.props.items.find((item) => item.id === this.state.selectItem);

    return selectItem.orders.map((item, key) => {
      if(DeviceSizeService.size.width > 1180) {
        return (
          <div className="item animated fadeInDown" key={key}>
            <div className="item-img-container">
              <img src={item.img} alt="item img" className="item-img"/>
            </div>
            <h2 className="item-title">{item.title}</h2>
            <p className="item-count">{item.count} шт.</p>
            <p className="item-price">{item.price}{euroSymbol}\шт.</p>
            <p className="item-all-price">{item.price}{euroSymbol}</p>
          </div>
        );
      }
      return (
        <div className="item animated fadeInDown" key={key}>
          <div className="left-block">
            <img src={item.img} alt="item img" className="item-img"/>
          </div>
          <div className="right-block">
            <h2 className="item-title">{item.title}</h2>
            <p className="item-count">{item.count} шт.</p>
            <p className="item-price">{item.price}{euroSymbol}\шт.</p>
            <p className="item-all-price">{item.price}{euroSymbol}</p>
          </div>
        </div>
      );
    });
  };

  render() {
    return this._getContentTab()
  }
}