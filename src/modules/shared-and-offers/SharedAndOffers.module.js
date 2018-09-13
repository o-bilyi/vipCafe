import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

import ArrowIcon from 'assets/svg/arrows.svg';
import RouterService from 'shared/services/RouterService';
import {navigationScheme} from '../../core';

const tabName = {
  shared : 'shared',
  offers : 'offers'
};

class SharedAndOffers extends React.Component {
  static propTypes = {
    auth: PropTypes.bool,

    sharedAndOffers: PropTypes.object,

    location: PropTypes.shape({
      state: PropTypes.string,
    })

  };

  state = {
    selectTab : this.props.location.state || tabName.shared
  };

  componentWillReceiveProps(newProps) {
    if(newProps.location.state !== this.props.location.state) {
      this.setState({
        selectTab : newProps.location.state || tabName.shared
      })
    }
  }

  _selectTab = (name) => {
    this.setState({
      selectTab :  name
    });
  };

  _openSingleItem = (item) => {
    const auth = this.props.auth;
    RouterService.navigateTo({
      pathname : navigationScheme.sharedAndOffersSingleItem,
      state : {
        auth,
        ...item
      }
    })
  };

  _getTabContent = (selectItem) => {
    return (
      this.props.sharedAndOffers.items.filter(item => item.type === tabName[selectItem]).map((item, key) => {
        return (
          <div className="item" key={key}>
            <p className="start-date">{item.date.start}</p>
            <div className="item-wrap">
              <div className="item-image-wrap" style={{backgroundImage : `url(${item.img})`}}>
                <span className="finish-date">до {item.date.end}</span>
              </div>
              <div className="item-content">
                <h2 className="item-title">{item.title}</h2>
                <p className="item-description">{item.description}</p>
                <button className="item-link" onClick={() => this._openSingleItem(item)}>Детальніше <ArrowIcon className='arrow-icon'/></button>
              </div>
            </div>
          </div>
        )
      })
    )
  };

  render() {
    return(
      <Wrapper>
        <div className="shared-and-offers-page">
          <div className="width-container">
            <ul className="header-tab">
              <li className={classNames("header-tab-item", this.state.selectTab === tabName.shared && "active")}>
                <button className="header-tab-btn" onClick={() => this._selectTab(tabName.shared)}>акції</button>
              </li>
              <li className={classNames("header-tab-item", this.state.selectTab === tabName.offers && "active")}>
                <button className="header-tab-btn" onClick={() => this._selectTab(tabName.offers)}>новинки</button>
              </li>
            </ul>
            <div className="tab-content">
              {
                this._getTabContent(this.state.selectTab)
              }
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

const mapStateProps = state => {
  return {
    auth : state.auth.isAuthorized,
    sharedAndOffers : state.sharesAndOffers
  }
};

export default connect(mapStateProps)(SharedAndOffers)
