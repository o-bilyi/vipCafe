import React from 'react';
import {store} from 'index';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {navigationScheme} from 'core';
// import BoxIcon from 'assets/svg/goods-icon/box.svg';
// import GrainsIcon from 'assets/svg/goods-icon/grains.svg';
// import WeightIcon from 'assets/svg/goods-icon/weight-icon.svg';
// import TechnologyIcon from 'assets/svg/goods-icon/technology.svg';

import Dialog from '@material-ui/core/Dialog';
import {addToBasket} from 'core/actions/basket';
import WarningIcon from 'assets/svg/warning.svg';

// const getIconForGoods =  {
//   "melena": <TechnologyIcon className='icon'/>,
//   "capsul": <TechnologyIcon className='icon'/>,
//   "zernova": <GrainsIcon className='icon'/>
// };

export default class ItemGoods extends React.Component {
  static propTypes = {
    id: PropTypes.any,
    img: PropTypes.any,
    title: PropTypes.any,
    price: PropTypes.any,
    count: PropTypes.any,
    properties: PropTypes.any,
    quantity: PropTypes.string
  };

  constructor(props){
    super(props);
    this.state = {
      count: props.count,
      openDescriptionModal: false,
      wasAddedItem: null,
    };
  }

  countItem = (value) => {
    if (this.state.count >= Number(this.props.quantity)) {
      return;
    }
    return (
        this.setState({
          count: Number(value.target.value)
        })
    )
  };

  getTotalCost = () => {
    return this.state.count * this.props.price;
  };

  _handleOpenDescriptionModal = () => {
    this.setState({
      openDescriptionModal: !this.state.openDescriptionModal,
    });
  };

  _addToBasket = (item) => () => {
    store.dispatch(addToBasket({
      ...item,
      count: this.state.count,
    }));
    this.setState({
      wasAddedItem : item.id
    })
  };

  _getTopContent = () => {
    const {img, title, properties} = this.props;
    const propertiesKeys = properties ? Object.keys(properties) : [];

    return (
      <React.Fragment>
        <div className='item-image-wrap' style={{backgroundImage : `url(${img})`}}/>
        <h2 className='item-title'>{title}</h2>
        <div className="item-types">
          {
            propertiesKeys.length
            &&
            propertiesKeys.map((item, key) => {
              return (
                <div className='item-properties' key={key}>
                  <img src={item.img} className='icon' alt={item.name}/>
                  <span className='text'>{properties[item].text}</span>
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
    )
  };

  getBottomContent = () => {
    return <Link
      to={navigationScheme.login}
      title="go to user dashboard page"
      className="login-to-platform">увійти в кабінет</Link>;
  };

  render() {
    return (
      <div className='item-wrap'>

        <div className="warning-block">
          <div className="icon-container">
            <WarningIcon className="icon"/>
          </div>
          <div className="description" title="Замовлення лише в цілих упаковках або ящиках!">
            Замовлення лише в цілих упаковках або ящиках!
            <button
              title="open details modal" type="button" className="show-description-modal"
              onClick={this._handleOpenDescriptionModal}>детальніше</button>
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
          className="goods-description-modal"
        >
          <div className="description-warning-item">Кількість штук в упаковці або ящику вказана у характеристиці товару.
            Якщо такої інформації немає, то товар можна замовляти поштучно.
          </div>
        </Dialog>

      </div>
    );
  }
}
