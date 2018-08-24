import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {navigationScheme} from 'core';
import ADBIcon from '@material-ui/icons/Adb';
import Dialog from '@material-ui/core/Dialog';
import WarningIcon from '@material-ui/icons/ErrorOutline';

export default class Item extends React.Component {
  static propTypes = {
    id : PropTypes.number,
    img : PropTypes.string,
    title : PropTypes.string,
    number : PropTypes.number,
    priceWithOne : PropTypes.number,
  };

  state = {
    countItem : '1',
    openDescriptionModal : false,
  };

  countItem = (value) => {
    this.setState({
      countItem : value.target.value
    })
  };

  getTotalCost = () => {
    return this.state.countItem * this.props.priceWithOne;
  };

  _handleOpenDescriptionModal = () => {
    this.setState({
      openDescriptionModal : !this.state.openDescriptionModal
    })
  };

  _addToBasket = (id,countItems) => () => {
    console.warn("add", id, countItems);
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

        <div className="warning-block">
          <div className="icon-container">
            <WarningIcon className="icon"/>
          </div>
          <div className="description">
            Замовлення лише в цілих упаковках або ящиках!
            <button className="show-description-modal" onClick={this._handleOpenDescriptionModal}>детальніше</button>
          </div>
        </div>

        {
          this._getTopContent()
        }

        {
          this.getBottomContent()
        }

        <Dialog
          scroll={'body'}
          open={this.state.openDescriptionModal}
          onClose={this._handleOpenDescriptionModal}
          classes={{
            paperFullScreen: 'thanks-modal-bg',
          }}
        >
          <div className="description-warning-item">
            Замовлення лише в цілих упаковках або ящиках!
            Замовлення лише в цілих упаковках або ящиках!
            Замовлення лише в цілих упаковках або ящиках!
          </div>
        </Dialog>

      </div>
    )
  }
}
