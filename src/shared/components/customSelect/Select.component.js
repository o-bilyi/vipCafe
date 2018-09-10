import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem, withStyles, InputLabel, FormControl} from '@material-ui/core';

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

class CustomSelect extends React.Component {
  static propTypes = {
    items : PropTypes.array,
    labelText : PropTypes.string,
    selectedItem : PropTypes.string,
    handleChangeSelect : PropTypes.func
  };

  state = {
    openSelect : false,
  };

  _getSelectItems = (items = []) => items.map((item, key) => {
    return <MenuItem
      key={key}
      classes={{
        root: this.props.classes.root,
        selected: this.props.classes.selected,
      }}
      className='filter-item'
      value={item}> {item} </MenuItem>;
  });

  handleOpenSelect = () => {
    this.setState({openSelect: true});
  };

  handleCloseSelect = () => {
    this.setState({openSelect: false});
  };

  render() {
    const  {
      items,
      selectedItem,
      labelText,
      handleChangeSelect} = this.props;

    const  {openSelect} = this.state;

    return (
      <div className="filters custom-filter">
        <InputLabel
          className="filter-label"
          htmlFor={"#" + labelText}>{labelText}</InputLabel>
        <FormControl className="select-container">

          <Select
            id={labelText}
            open={openSelect}
            value={selectedItem}
            aria-haspopup="true"
            style={styles.selectStyle}
            onChange={handleChangeSelect}
            onOpen={this.handleOpenSelect}
            onClose={this.handleCloseSelect}
            MenuProps={{className: 'filter-ul'}}
            className="filter-select product-select"
            SelectDisplayProps={{className: 'select-label'}}
          >
            {
              this._getSelectItems(items)
            }
          </Select>
        </FormControl>

      </div>
    );
  }
}

export default withStyles(styles)(CustomSelect)
