import React from 'react';
import {store} from 'index';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {navigationScheme} from 'core';
// import BoxIcon from 'assets/svg/goods-icon/box.svg';
import GrainsIcon from 'assets/svg/goods-icon/grains.svg';
import WeightIcon from 'assets/svg/goods-icon/weight-icon.svg';
import TechnologyIcon from 'assets/svg/goods-icon/technology.svg';

import Dialog from '@material-ui/core/Dialog';
import {addToBasket} from 'core/actions/basket';
import WarningIcon from 'assets/svg/warning.svg';

const typeProduct = {
  "melena": "мелена",
  "capsul": "капсульна",
  "zernova": "зернова",
};

// const containerProduct = {
//   "upakovka": "упаковці",
//   "jashik": "ящику",
// };

const unitsProduct = {
  "capsul": "капсул",
  "shtuk": "штук",
  "gram": "г",
  "kilogram": "кілограм",
};

const getIconForGoods =  {
  "melena": <TechnologyIcon className='icon'/>,
  "capsul": <TechnologyIcon className='icon'/>,
  "zernova": <GrainsIcon className='icon'/>
};

export default class ItemGoods extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    img: PropTypes.any,
    title: PropTypes.any,
    price: PropTypes.any,
    count: PropTypes.any,
    properties: PropTypes.any,
  };

  state = {
    count: this.props.count,
    openDescriptionModal: false,
    wasAddedItem: null,
  };

  countItem = (value) => {
    this.setState({
      count: Number(value.target.value),
    });
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

    // console.warn(properties);

    return [
      <div key={1} className='item-image-wrap' style={{backgroundImage : `url(${img})`}}/>,
      <h2 key={2} className='item-title'>{title}</h2>,
      <div key={3} className='item-properties-wrap'>
        <div className="item-types">
          {
            [
              <div className='item-properties' key={1}>
                {
                  getIconForGoods[properties.type]
                }
                <span className='text'>{typeProduct[properties.type]}</span>
              </div>,

              properties.odunits === "gram" &&
              <div className='item-properties' key={2}>
                <WeightIcon className='icon'/>
                <span className='text'>{properties.value} {unitsProduct["gram"]}</span>
              </div>
            ]
            /*properties.map((item, key) => {
              return [
                <div className='item-properties' key={key}>
                  {
                    getIconForGoods(properties.odunits)
                  }
                  <span className='text'>{item.name}</span>
                </div>,

                item.weight &&
                <div className='item-properties' key={key + 1}>
                  <WeightIcon className='icon'/>
                  <span className='text'>{item.weight} г</span>
                </div>
              ];
            })*/
          }
        </div>
        <div className="in-the-package">
          <div className='item-properties'>
            {/*{
            properties.map((item, key) => {
              return (
                <div className='item-properties' key={key}>
                  {
                    item.numberInBox &&
                    [
                      <BoxIcon key={1} className='icon'/>,
                      <span key={2} className='text'>в ящику {item.numberInBox} штук</span>,
                    ]
                  }
                  {

                    item.numberInPackage &&
                      [
                        <BoxIcon key={3} className='icon'/>,
                        <span key={4} className='text'>в упаковці {item.numberInPackage} капсул</span>
                      ]
                  }
                </div>
              );
            })
          }*/}
          </div>
        </div>
      </div>
    ]
  };

  getBottomContent = () => {
    return <Link to={navigationScheme.login} title="go to user dashboard page" className="login-to-platform">увійти в кабінет</Link>;
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
