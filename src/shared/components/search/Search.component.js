import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CrossIcon from "assets/svg/cross.svg";
import SearchIcon from "assets/svg/search.svg";
import {Button, TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  textField: {
    width: "100%"
  },
  cssLabel: {
    "&$cssFocused": {
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
    open : false,
    value : ''
  };

  _toggleSearchInput = () => {
    this.setState({
      open : !this.state.open
    })
  };

  _changeValue = (event) => {
    this.setState({
      value : event.target.value
    })
  };

  _clearInput = () => {
    this.setState({
      value : ""
    })
  };

  render() {
    return (
      <div className={classNames("search-wrap",this.state.open && "open")}>
        <TextField
          id="search"
          type="search"
          margin="normal"
          InputProps={{
            classes: {
              root: "search-input",
              input: "input-style"
            }
          }}
          InputLabelProps={{
            classes:{
              root: "label-style"
            }
          }}
          value={this.state.value}
          onChange={this._changeValue}
          className={classNames("search-input-wrap", this.props.classes.textField)}
        />
        <Button className="clear-btn" onClick={this._clearInput}>
          <CrossIcon className="search-icon"/>
        </Button>

        <Button className="search-btn" onClick={this._toggleSearchInput}>
          <SearchIcon className="search-icon"/>
        </Button>
      </div>
    )
  }
}


export default withStyles(styles)(Search);
