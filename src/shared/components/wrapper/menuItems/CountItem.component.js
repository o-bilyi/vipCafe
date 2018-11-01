import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/**
 * @return {string}
 */
function CountItem(props) {
  const countItem = props[props.storageTarget];
  if(countItem) {
    return <span className="count-item">{countItem.length}</span>;
  }
  return '';
}

CountItem.propTypes = {
  storageTarget: PropTypes.string,
  basket: PropTypes.array
};

const mapStateToProps = state => {
  return {
    basket: state.basket.items,
    archive: state.archive,
    sharesAndOffers: state.sharesAndOffers.items
  };
};

export default connect(mapStateToProps)(CountItem)
