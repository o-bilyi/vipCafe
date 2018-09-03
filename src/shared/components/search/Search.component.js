import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchIcon from 'assets/svg/search.svg';
import {Button, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  textField: {
    width: "100%"
  },
  cssLabel: {
    '&$cssFocused': {
      color: "red",
    },
  },
  cssFocused: {},
});

class Search extends React.Component {
  static propTypes = {
    name : PropTypes.string,
    classes: PropTypes.object.isRequired,
  };
  state = {
    open : false
  };

  _toggleSearchInput = () => {
    this.setState({
      open : !this.state.open
    })
  };

  render() {
    return (
      <div className={classNames("search-wrap",this.state.open && "open")}>
        <TextField
          id="search"
          type="search"
          margin="normal"
          label="Пошук на сайті"
          className={classNames("search-input-wrap", this.props.classes.textField)}
          InputLabelProps={{
            classes:{
              root: "label-style"
            }
          }}
          InputProps={{
            classes: {
              root: "search-input",
              input: "input-style"
            }
          }}
        />
        <Button className="search-btn" onClick={this._toggleSearchInput}>
          <SearchIcon className="search-icon"/>
        </Button>
      </div>
    )
  }
}


export default withStyles(styles)(Search);