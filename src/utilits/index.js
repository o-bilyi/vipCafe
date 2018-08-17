// import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

const GlobalStore = ({store}) => {

  const deviceType = {
    desktop: 'desktop',
    tablet: 'tablet',
    mobile: 'mobile',
  };

  const getDeviceType = () => {
    const bodyWidth = this.props.globalState;
    let type;
    if (bodyWidth > 1024) {
      type = 'desktop';
    }
    if (bodyWidth <= 1024 && !bodyWidth < 680) {
      type = 'tablet';
    }
    if (bodyWidth <= 680) {
      type = 'mobile';
    }
    return (type);
  };

  return(store);

};

GlobalStore.PropTypes = {
  globalState: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    globalState: state.globalState,
  };
};

export default connect(mapStateToProps)(GlobalStore);