import React from 'react';
// import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import Item from 'shared/components/goods/ItemWithPrice/index';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const item = [
  {
    id : 1,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'capsule',
    number: 100,
    priceWithOne: 12,
    numberInPackage: 10000,
  },
  {
    id : 2,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'grounded',
    number: 20,
    priceWithOne: 12,
    numberInPackage: 1000,
  },
  {
    id : 3,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'cereal',
    number: 20,
    priceWithOne: 12,
    numberInPackage: 1000,
  },
];

const cheeseSelect = ['Сир', 'Мясо'];

const styles = {
  root: {
    borderRadius: 0,
  },

  menuItemStyle: {
    fontSize: '13px',
    color: '#494949',
  },

  selectStyle: {
    alignItems: 'center',
    height: '40px',
  },
};

class Catalog extends React.Component {

  state = {
    cheese : [],
    openCheeseSelect : false
  };

  _getSelectItems = items => items.map((item, key) => {
    return <MenuItem
      key={key}
      style={styles.menuItemStyle}
      value={item}>{item}</MenuItem>;
  });

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleCloseSelect = name => {
    this.setState({[name]: false});
  };

  handleOpenSelect = name => {
    this.setState({[name]: true});
  };

  render() {
    const {openCheeseSelect, cheese} = this.state;
    return (
      <Wrapper>
        <div className="catalog-page">
          <div className="tab-categories">
            <Button classes={{label : "tab-item-wrap"}}
                    className="tab-item">
              <CakeIcon className="tab-icon"/>
              <span className="text">кава</span>
            </Button>
            <Button classes={{label : "tab-item-wrap"}}
                    className="tab-item active">
              <CakeIcon className="tab-icon"/>
              <span className="text">сир/м'ясо</span>
            </Button>
            <Button classes={{label : "tab-item-wrap"}}
                    className="tab-item">
              <CakeIcon className="tab-icon"/>
              <span className="text">бакалія</span>
            </Button>
            <Button classes={{label : "tab-item-wrap"}}
                    className="tab-item">
              <CakeIcon className="tab-icon"/>
              <span className="text">шоколад</span>
            </Button>
          </div>
          <div className="filters">
            <div className="filter-product">

              <div className="select-container">
                <label className="filter-label" htmlFor="#product">Продукт:</label>
                <Select
                  multiple
                  value={cheese}
                  aria-haspopup="true"
                  open={openCheeseSelect}
                  style={styles.selectStyle}
                  className="filter-select product-select"
                  onChange={this.handleChangeSelect('cheese')}
                  SelectDisplayProps={{className: 'select-label'}}
                  onOpen={() => this.handleOpenSelect('openCheeseSelect')}
                  onClose={() => this.handleCloseSelect('openCheeseSelect')}
                >
                  {
                    this._getSelectItems(cheeseSelect)
                  }
                </Select>
              </div>

            </div>
          </div>

          <div className="goods-wrap">
            {
              item.map((item, key) => {
                return <Item items={item} key={key}/>;
              })
            }
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(Catalog);