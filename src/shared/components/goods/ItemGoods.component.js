import React from 'react';
import PropTypes from 'prop-types';
import ADBIcon from '@material-ui/icons/Adb';
import {Link} from 'react-router-dom';
import {navigationScheme} from 'core';


export default class Item extends React.Component {
  static propTypes = {
    id : PropTypes.number,
    img : PropTypes.string,
    title : PropTypes.string,
    number : PropTypes.number,
    priceWithOne : PropTypes.number,
  };

  _addToBasket = (id) => () => {
    console.warn("add", id);
  };

  _getTopContent = () => {
    const {img,title,number} = this.props;

    return [
      <div key={1} className='item-image-wrap'>
        <img className='item-image' src={img} alt='item-img'/>
      </div>,

      <h2 key={2} className='item-title'>{title}</h2>,

      <div key={3} className='item-properties-wrap'>

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
            <span className='text'>в упаковці {number} капсул</span>
          </div>
        </div>

      </div>
    ];
  };

  getBottomContent = () => {
    return <Link to={navigationScheme.login} className="login-to-platform">зайти</Link>;
  };

  render() {
    return (
      <div className='item-wrap'>

        {
          this._getTopContent()
        }

        {
          this.getBottomContent()
        }

      </div>
    )
  }
}
