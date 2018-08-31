import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CakeIcon from '@material-ui/icons/Cake';
import {DeviceSizeService} from 'utilits/index';
import ArrowIcon from '@material-ui/icons/ArrowBack';
import connect from 'react-redux/es/connect/connect';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import ItemGoods from 'shared/components/goods/ItemGoods.component';
import ItemWithPrice from 'shared/components/goods/ItemWithPrice.component';
import {MenuItem, Button, Select, InputLabel, FormControl,Dialog,withStyles} from '@material-ui/core';

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
  {
    id: 4,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'capsule',
    number: 100,
    priceWithOne: 12,
    numberInPackage: 10000,
  },
  {
    id: 5,
    title: 'Lavazza Crema e Aroma Espresso Blue',
    img: '/img/img-item.png',
    type: 'grounded',
    number: 20,
    priceWithOne: 12,
    numberInPackage: 1000,
  },
  {
    id: 6,
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
  static propTypes = {
    isAuthorized: PropTypes.bool
  };

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

    openFilterModal: false,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

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

  getGoodsItem = (props, key) => {
    if(this.props.isAuthorized){
      return <ItemWithPrice {...props} key={key}/>;
    }
    return <ItemGoods {...props} key={key}/>
  };

  _toggleFilterModal = () => {
    this.setState({
      openFilterModal : !this.state.openFilterModal
    });
  };

  _getFilters = () => {
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

    if(DeviceSizeService.size.width < 768) {
      return (
        <div className='filters'>
          <Button className="show-filters" onClick={this._toggleFilterModal}>фільтр і сортування</Button>
        </div>
      )
    }
    return (
      <div className="filters">
        <div className="filter-product">

          <FormControl className="select-container">
            <InputLabel className="filter-label animate-label" htmlFor="#product">Продукт:</InputLabel>
            <Select
              value={product}
              aria-haspopup="true"
              open={openCheeseSelect}
              style={styles.selectStyle}
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
          </FormControl>

          <label className="filter-label-of-goods custom-label">Фільтр товарів:</label>

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
    )
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
                    className={classNames('tab-item coffee', coffee && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">кава</span>
            </Button>
            <Button onClick={() => this.handleChangeGoods('cheeseAndMeat')}
                    classes={{label: 'tab-item-wrap'}}
                    className={classNames('tab-item cheeseAndMeat', cheeseAndMeat && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">сир/м'ясо</span>
            </Button>
            <Button onClick={() => this.handleChangeGoods('grocery')}
                    classes={{label: 'tab-item-wrap'}}
                    className={classNames('tab-item grocery', grocery && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">бакалія</span>
            </Button>
            <Button onClick={() => this.handleChangeGoods('chocolate')}
                    classes={{label: 'tab-item-wrap'}}
                    className={classNames('tab-item chocolate', chocolate && 'active')}>
              <CakeIcon className="tab-icon"/>
              <span className="text">шоколад</span>
            </Button>
          </div>

          {
            this._getFilters()
          }

          <div className="goods-wrap">
            {
              item.map((item, key) => {
                return this.getGoodsItem(item, key);
              })
            }
          </div>
          <Dialog
            fullScreen
            open={this.state.openFilterModal}
            onClose={this._handleOpenDescriptionModal}
            className="filters-mobile-modal"
          >
            <div className="filters">
              <button className="back-btn" onClick={this._toggleFilterModal}><ArrowIcon className="back-icon"/></button>
              <div className="filter-product">

                <FormControl className="select-container" onClick={() => this.handleOpenSelect('openCheeseSelect')}>
                  <InputLabel className="filter-label animate-label" htmlFor="#product">Продукт:</InputLabel>
                  <Select
                    value={product}
                    aria-haspopup="true"
                    open={openCheeseSelect}
                    style={styles.selectStyle}
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
                </FormControl>

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

          </Dialog>
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Catalog));
