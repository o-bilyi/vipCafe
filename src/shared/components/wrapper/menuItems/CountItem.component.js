import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/**
 * @return {string}
 */
function CountItem(props) {
  const countItem = props[props.storageTarget].length;
  if(countItem) {
    return <span className="count-item">{countItem}</span>;
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
    archive: state.archive.items,
    sharesAndOffers: state.sharesAndOffers.items
  };
};

export default connect(mapStateToProps)(CountItem)