import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';


export default class Item extends React.Component {
  static propTypes = {
    id : PropTypes.number,
    img : PropTypes.string,
    title : PropTypes.string,
    properties : PropTypes.object,
    countItem : PropTypes.number,
    priceWithOne : PropTypes.number,
    allPrice: PropTypes.number
  };

  state = {
    countItem : 0,
    priceWithOne : 0,
    allPrice : 0
  };

  _copyOrRemoveItem = (method, id) => {
    console.warn(method);
    console.warn(id);
  };

  render() {
    const {id} = this.props;
    const {countItem, priceWithOne, allPrice} = this.state;

    return (
      <tr className="table-tr">
        <td className="buttons-and-img">
          <div className="buttons">
            <button onClick={this._copyOrRemoveItem('remove', id)} className="remove-item"><ClearIcon className="icon"/></button>
            <button onClick={this._copyOrRemoveItem('copy', id)} className="copy-item"><FileCopyIcon className="icon"/></button>
          </div>
          <div className="image-wrap">
            <img src="img/img-item.png" className="img-item" alt="img-item"/>
          </div>
        </td>
        <td className="border-right">
          <div className="title-and-properties">
            <h2 className="title-item">Lavazza Crema e Aroma Espresso Blue</h2>
            <div className="properties">
              <p className="item-props">icon капсульна</p>
              <p className="item-props">icon капсульна</p>
            </div>
          </div>
        </td>
        <td className="border-right">
          <div className="count-item-wrap">
            <button className="increment-item"><KeyboardArrowLeftIcon className="icon"/></button>
            <input type="number" min={1} className="count-item" value={countItem}/>
            <button className="decrement-item"><KeyboardArrowRightIcon className="icon"/></button>
          </div>
        </td>
        <td className="price-with-one border-right">
          {priceWithOne}
          <EuroSymbolIcon className="icon"/>
        </td>
        <td className="all-price">
          {allPrice}
          <EuroSymbolIcon className="icon"/>
        </td>
      </tr>
    );
  }
}
