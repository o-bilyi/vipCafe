import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

import ArrowIcon from 'assets/svg/arrows.svg';

const tabName = {
  shared : 'shared',
  offers : 'offers'
};

class SharedAndOffers extends React.Component {
  static propTypes = {
    selectTab : PropTypes.string,
    sharedAndOffers: PropTypes.object,
    location: PropTypes.shape({
      state: PropTypes.string,
    }),
  };

  static defaultProps = {
    selectTab : tabName.shared
  };

  state = {
    selectTab : this.props.selectTab
  };

  _selectTab = (name) => {
    this.setState({
      selectTab :  name
    });
  };

  _getTabContent = (selectItem) => {
    return (
      this.props.sharedAndOffers.items.filter(item => item.type === tabName[selectItem]).map((item, key) => {
        return (
          <div className="item" key={key}>
            <p className="start-date">{item.date.start}</p>
            <div className="item-wrap">
              <div className="item-image-wrap" style={{backgroundImage : `url(${item.img})`}}>
                <span className="finish-date">до {item.date.and}</span>
              </div>
              <div className="item-content">
                <h2 className="item-title">{item.title}</h2>
                <p className="item-description">{item.description}</p>
                <Link className="item-link" to="sing-item">Детальніше <ArrowIcon className='arrow-icon'/></Link>
              </div>
            </div>
          </div>
        )
      })
    )
  };

  render() {
    console.warn(this.props.location);
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
    sharedAndOffers : state.sharesAndOffers
  }
};

export default connect(mapStateProps)(SharedAndOffers)