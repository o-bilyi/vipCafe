import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SteakIcon from 'assets/svg/steak.svg';
import CoffeeIcon from 'assets/svg/coffee.svg';
import CheeseIcon from 'assets/svg/cheese.svg';
import GroceryIcon from 'assets/svg/grocery.svg';
import ChocolateIcon from 'assets/svg/chocolate.svg';
import ArrowIcon from '@material-ui/icons/ArrowBack';

import {httpService} from "services";
import {DeviceSizeService} from 'utilits/index';
import {Button, Dialog} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {Progress} from "shared/components/preloader/Preloader";
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import ItemGoods from 'shared/components/goods/ItemGoods.component';
import CustomSelect from 'shared/components/customSelect/Select.component';
import ItemWithPrice from 'shared/components/goods/ItemWithPrice.component';
import MultiSelect from 'shared/components/customSelect/MultiSelect.component';

const cheeseSelect = ['СИР', 'М\'ЯСО'];
const sortSelect = ['ВІД ДОРОГИХ ДО ДЕШЕВИХ', 'ВІД ДЕШЕВИХ ДО ДОРОГИХ'];
const brandSelect = ['РОСІЙСЬКИЙ', 'МАЦАРЕЛЛА'];
const typeSelect = ['ТВЕРДИЙ', 'ПЛАВЛЕНИЙ'];
const weightSelect = ['250г (8)', '450г (44)', '1кг (8)', '10кг (44)', '15кг (8)', '20кг (44)'];


const keys = {
  coffee: "kava",
  cheeseAndMeat: "syr-myaso",
  grocery: "bakaliya",
  chocolate: "shokolad",
};

const categoryTabID = {
  [keys.grocery]: 6,
  [keys.coffee]: 2,
  [keys.cheeseAndMeat]: 3,
  [keys.chocolate]: 7
};

const tabIcons = {
  [keys.grocery]: <GroceryIcon className="tab-icon"/>,
  [keys.coffee]: <CoffeeIcon className="tab-icon"/>,
  [keys.cheeseAndMeat]: [<CheeseIcon key={1} className="tab-icon"/>, <SteakIcon key={2} className="tab-icon"/>],
  [keys.chocolate]: <ChocolateIcon className="tab-icon"/>,
};

class Catalog extends React.Component {
  static propTypes = {
    isAuthorized: PropTypes.bool
  };

  state = {
    tabs: [],
    activeGoods: keys.coffee, //active category
    products: [],

    /**
     * customSelect value
     */
    product: '',
    sort: '',
    brand: '',
    type: '',
    weight: [],
    /**
     * customSelect value
     */

    openFilterModal: false,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
    httpService.getRequest(httpService.URLS.shop).then(res => this.setState({tabs: res}));
    this._getGoods(this.state.activeGoods);
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleChangeGoods = (name = "") => {
    this.setState({
      activeGoods: name
    }, () => this._getGoods(name));
  };

  _getGoods = (activeCategory) => {
    httpService.getRequest(httpService.URLS.getProducts + `?shop=${categoryTabID[activeCategory]}`).then(res => {
      this.setState({
        products: res
      })
    });
  };

  getGoodsItem = (props, key) => {
    const items = {
      count: 1,
      id: props.id,
      price: props.price,
      img: props.gallery[0].thumb,
      title: props.title["rendered"],
      properties: {...props.product_type}
    };
    if (this.props.isAuthorized) {
      return <ItemWithPrice {...items} key={key}/>;
    }
    return <ItemGoods {...items} key={key}/>
  };

  _toggleFilterModal = () => {
    this.setState({
      openFilterModal: !this.state.openFilterModal
    });
  };

  _getFilters = () => {
    if (DeviceSizeService.size.width < 992) {
      return (
        <div className='custom-filter-container'>
          <Button className="show-filters" onClick={this._toggleFilterModal}>фільтр і сортування</Button>
        </div>
      )
    }
    return (
      <div className="custom-filter-container">
        {this._getFiltersProduct()}
      </div>
    )
  };

  _getFiltersProduct = () => {
    const {
      product,
      sort,
      brand,
      type,
      weight,
    } = this.state;

    return (
      <div className="filter-product">

        <CustomSelect
          placeholder
          labelText="Продукт"
          items={cheeseSelect}
          selectedItem={product}
          handleChangeSelect={this.handleChangeSelect('product')}
        />

        <label className="filter-label-of-goods custom-label">Фільтр товарів:</label>

        <CustomSelect
          placeholder
          labelText="сортування"
          items={sortSelect}
          selectedItem={sort}
          handleChangeSelect={this.handleChangeSelect('sort')}
        />

        <CustomSelect
          placeholder
          labelText="Бренд"
          items={brandSelect}
          selectedItem={brand}
          handleChangeSelect={this.handleChangeSelect('brand')}
        />

        <CustomSelect
          placeholder
          labelText="тип сиру"
          items={typeSelect}
          selectedItem={type}
          handleChangeSelect={this.handleChangeSelect('type')}
        />

        <MultiSelect
          labelText="вага"
          countTheSelectedItem
          items={weightSelect}
          selectedItem={weight}
          weightLength={this.state.weight.length}
          resetSelectItems={this._resetSelectItems('weight')}
          handleChangeSelect={this.handleChangeSelect('weight')}
        />

      </div>
    )
  };

  _resetSelectItems = (resetItem) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      [resetItem]: []
    }, () => this.state[resetItem]);
  };

  getTabCategory = () => {
    const tabs = this.state.tabs;
    return (
      <div className="tab-categories">
        {
          tabs ? tabs.map((elem, key) => {
              return (
                <Button
                  key={key + 1} onClick={() => this.handleChangeGoods(elem.slug)}
                  classes={{label: 'tab-item-wrap'}}
                  className={classNames(`tab-item ${elem.slug}`, this.state.activeGoods === elem.slug && 'active')}>
                  {
                    tabIcons[elem.slug]
                  }
                  <span className="text">{elem.name}</span>
                </Button>
              )
            })
            : <Progress globalProgress={false}/>
        }
      </div>
    );
  };

  render() {
    return (
      <Wrapper>
        <div className="catalog-page">

          {
            this.getTabCategory()
          }

          {
            this._getFilters()
          }

          <div className="goods-wrap">
            {
              this.state.products.map((item, key) => {
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
            <div className="catalog-mobile-filters">
              <button className="back-btn" onClick={this._toggleFilterModal}><ArrowIcon
                className="back-icon"/></button>
              {this._getFiltersProduct()}
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

export default connect(mapStateToProps)(Catalog);
