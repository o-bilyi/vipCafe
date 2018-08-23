import React from 'react';
import classNames from 'classnames';
import CakeIcon from '@material-ui/icons/Cake';
import {withStyles} from '@material-ui/core/styles';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import ItemWithPrice from 'shared/components/goods/ItemWithPrice.component';
import {MenuItem, Button, Select, InputLabel, FormControl} from '@material-ui/core';

const item = [
  {
    id: 1,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'capsule',
    number: 100,
    priceWithOne: 12,
    numberInPackage: 10000,
  },
  {
    id: 2,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'grounded',
    number: 20,
    priceWithOne: 12,
    numberInPackage: 1000,
  },
  {
    id: 3,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'cereal',
    number: 20,
    priceWithOne: 12,
    numberInPackage: 1000,
  },
];

const cheeseSelect = ['СИР', 'М\'ЯСО'];
const sortSelect = ['ВІД ДОРОГИХ ДО ДЕШЕВИХ', 'ВІД ДЕШЕВИХ ДО ДОРОГИХ'];
const brandSelect = ['РОСІЙСЬКИЙ', 'МАЦАРЕЛЛА'];
const typeSelect = ['ТВЕРДИЙ', 'ПЛАВЛЕНИЙ'];
const weightSelect = [
  '250 г (8)', '450 г (44)', '1 кг(8)',
  '10 кг (44)', '15 кг (8)', '20 кг (44)'];

const styles = {
  root: {
    '&$selected': {
      color: '#fff',
      backgroundColor: '#78ae59',
    },
  },

  selected: {},

  selectStyle: {
    alignItems: 'center',
    height: '40px',
  },
};

class Catalog extends React.Component {
  state = {
    /**
     * active tab
     */
    activeGoods: {
      coffee: true,
      cheeseAndMeat: false,
      grocery: false,
      chocolate: false,
    },
    /**
     * select value
     */
    product: '',
    sort: '',
    brand: '',
    type: '',
    weight: [],
    /*
    open and close selects
     */
    openCheeseSelect: false,
    openSortSelect: false,
    openBrandSelect: false,
    openTypeSelect: false,
    openWeightSelect: false,
  };

  _getSelectItems = items => items.map((item, key) => {
    return <MenuItem
      key={key}
      classes={{
        root: this.props.classes.root,
        selected: this.props.classes.selected,
      }}
      className='filter-item'
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

  handleChangeGoods = name => {
    this.setState({
      activeGoods: {
        [name]: true,
      },
    });
  };

  _resetSelectItems = (resetItem) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.state[resetItem]);
    this.setState({
      [resetItem]: []
    }, () =>  console.log(this.state[resetItem]));
  };

  render() {
    const {
      openCheeseSelect,
      openSortSelect,
      openBrandSelect,
      openTypeSelect,
      openWeightSelect,
      product,
      sort,
      brand,
      type,
      weight,
    } = this.state;

    const {coffee, cheeseAndMeat, grocery, chocolate} = this.state.activeGoods;

    return (
      <Wrapper>
        <div className="catalog-page">
          <div className="tab-categories">
            <Button onClick={() => this.handleChangeGoods('coffee')}
                    classes={{label: 'tab-item-wrap'}}
                    className={classNames('tab-item', coffee && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">кава</span>
            </Button>
            <Button onClick={() => this.handleChangeGoods('cheeseAndMeat')}
                    classes={{label: 'tab-item-wrap'}}
                    className={classNames('tab-item', cheeseAndMeat && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">сир/м'ясо</span>
            </Button>
            <Button onClick={() => this.handleChangeGoods('grocery')}
                    classes={{label: 'tab-item-wrap'}}
                    className={classNames('tab-item', grocery && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">бакалія</span>
            </Button>
            <Button onClick={() => this.handleChangeGoods('chocolate')}
                    classes={{label: 'tab-item-wrap'}}
                    className={classNames('tab-item', chocolate && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">шоколад</span>
            </Button>
          </div>
          <div className="filters">
            <div className="filter-product">

              <div className="select-container">
                <label className="filter-label" htmlFor="#product">Продукт:</label>
                <Select
                  value={product}
                  aria-haspopup="true"
                  open={openCheeseSelect}
                  MenuProps={{className: 'filter-ul'}}
                  className="filter-select product-select"
                  onChange={this.handleChangeSelect('product')}
                  SelectDisplayProps={{className: 'select-label'}}
                  onOpen={() => this.handleOpenSelect('openCheeseSelect')}
                  onClose={() => this.handleCloseSelect('openCheeseSelect')}
                >
                  {
                    this._getSelectItems(cheeseSelect)
                  }
                </Select>
                <label className="filter-label-of-goods">Фільтр товарів:</label>
              </div>

              <FormControl className="select-container">
                <InputLabel className="filter-label animate-label">сортування</InputLabel>
                <Select
                  value={sort}
                  aria-haspopup="true"
                  open={openSortSelect}
                  style={styles.selectStyle}
                  className="filter-select"
                  MenuProps={{className: 'filter-ul'}}
                  onChange={this.handleChangeSelect('sort')}
                  SelectDisplayProps={{className: 'select-label'}}
                  onOpen={() => this.handleOpenSelect('openSortSelect')}
                  onClose={() => this.handleCloseSelect('openSortSelect')}
                >
                  {
                    this._getSelectItems(sortSelect)
                  }
                </Select>
              </FormControl>

              <FormControl className="select-container">
                <InputLabel className="filter-label animate-label">Бренд</InputLabel>
                <Select
                  value={brand}
                  aria-haspopup="true"
                  open={openBrandSelect}
                  style={styles.selectStyle}
                  className="filter-select"
                  MenuProps={{className: 'filter-ul'}}
                  onChange={this.handleChangeSelect('brand')}
                  SelectDisplayProps={{className: 'select-label'}}
                  onOpen={() => this.handleOpenSelect('openBrandSelect')}
                  onClose={() => this.handleCloseSelect('openBrandSelect')}
                >
                  {
                    this._getSelectItems(brandSelect)
                  }
                </Select>
              </FormControl>

              <FormControl className="select-container">
                <InputLabel className="filter-label animate-label">тип сиру</InputLabel>
                <Select
                  value={type}
                  aria-haspopup="true"
                  open={openTypeSelect}
                  style={styles.selectStyle}
                  className="filter-select"
                  MenuProps={{className: 'filter-ul'}}
                  onChange={this.handleChangeSelect('type')}
                  SelectDisplayProps={{className: 'select-label'}}
                  onOpen={() => this.handleOpenSelect('openTypeSelect')}
                  onClose={() => this.handleCloseSelect('openTypeSelect')}
                >
                  {
                    this._getSelectItems(typeSelect)
                  }
                </Select>
              </FormControl>

              <FormControl className="select-container">
                <InputLabel className="filter-label animate-label">ВАГА</InputLabel>
                <Select
                  multiple
                  value={weight}
                  aria-haspopup="true"
                  open={openWeightSelect}
                  style={styles.selectStyle}
                  className="filter-select"
                  MenuProps={{className: 'filter-ul'}}
                  onChange={this.handleChangeSelect('weight')}
                  SelectDisplayProps={{className: 'select-label'}}
                  onOpen={() => this.handleOpenSelect('openWeightSelect')}
                  onClose={() => this.handleCloseSelect('openWeightSelect')}
                >
                  <li className="count-select-item-wrap">
                    <span className="count-select-item">count : {this.state.weight.length}</span>
                    <button onClick={this._resetSelectItems('weight')} className="clear-select-item">очистити</button>
                  </li>

                  {
                    this._getSelectItems(weightSelect)
                  }
                </Select>
              </FormControl>

            </div>
          </div>

          <div className="goods-wrap">
            {
              item.map((item, key) => {
                return <ItemWithPrice {...item} key={key}/>;
              })
            }
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(Catalog);
