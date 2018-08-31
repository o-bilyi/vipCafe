import React from 'react';
import PropTypes from 'prop-types';
import {euroSymbol} from 'utilits/index';
import ClearIcon from '@material-ui/icons/Clear';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export default class Item extends React.Component {
  static propTypes = {
    id : PropTypes.number,
    img : PropTypes.string,
    title : PropTypes.string,
    getAllPrice: PropTypes.func,
    countItem : PropTypes.number,
    properties : PropTypes.array,
    priceWithOne : PropTypes.number
  };

  state = {
    countItem : this.props.countItem ? this.props.countItem : 0,
    priceWithOne : this.props.priceWithOne ? this.props.priceWithOne : 0
  };

  copyOrRemoveItem = (method, id) => () => {
    console.warn(method);
    console.warn(id);
  };

  incrementOrDecrementItem = (increment) => () => {
    if(increment) {
      this.setState({
        countItem : this.state.countItem + 1
      })
    }else {
      this.setState({
        countItem : this.state.countItem > 1 ? this.state.countItem - 1 : this.state.countItem
      })
    }
  };

  changeCountItem = (value) => {
    this.setState({
      countItem : value
    })
  };

  getContent = () => {
    const {id,img, title,properties,getAllPrice} = this.props;
    const {countItem, priceWithOne} = this.state;
    return (
      <tr className="table-tr">
        <td className="buttons-and-img">
          <div className="buttons">
            <button onClick={this.copyOrRemoveItem('remove', id)} className="remove-item"><ClearIcon className="icon"/></button>
            <button onClick={this.copyOrRemoveItem('copy', id)} className="copy-item"><FileCopyIcon className="icon"/></button>
          </div>
          <div className="image-wrap">
            <img src={img} className="img-item" alt="img-item"/>
          </div>
        </td>
        <td className="border-right">
          <div className="title-and-properties">
            <h2 className="title-item">{title}</h2>
            <div className="properties">
              {
                properties.map((item, key) => {
                  return  <p className="item-props" key={key}>icon {item}</p>
                })
              }
            </div>
          </div>
        </td>
        <td className="border-right">
          <div className="count-item-wrap">
            <button className="increment-item" onClick={this.incrementOrDecrementItem(false)}>
              <KeyboardArrowLeftIcon className="icon"/>
            </button>
            <input type="number" min={1} className="count-item"
                   onChange={(value) => this.changeCountItem(value)}
                   value={countItem}/>
            <button className="decrement-item" onClick={this.incrementOrDecrementItem(true)}>
              <KeyboardArrowRightIcon className="icon"/>
            </button>
          </div>
        </td>
        <td className="price-with-one border-right">
          {priceWithOne}
          {euroSymbol}
        </td>
        <td className="all-price">
          {getAllPrice(priceWithOne, countItem)}
          {euroSymbol}
        </td>
      </tr>
    );
  };

  render() {
    return this.getContent()
  }
}
