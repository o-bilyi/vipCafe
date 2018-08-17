import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

class Catalog extends React.Component {
  static propTypes = {
    globalState: PropTypes.object
  };

  render() {
    console.warn(this.props.globalState);
    return <div>Catalog</div>
  }
}

const mapStateToProps = state => {
  return {
    globalState: state.globalState,
  };
};

export default connect(mapStateToProps)(Catalog);