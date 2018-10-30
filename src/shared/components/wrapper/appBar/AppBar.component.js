import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import {Button, AppBar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchComponent from '../../search/Search.component';
import AccountInfo from '../../account-info/AccountInfo.component';
import {DeviceSizeService} from 'utilits/index';

export default class AppBarComponent extends React.Component {
  static propTypes = {
    open : PropTypes.bool,
    handleDrawerOpen : PropTypes.func
  };

  state = {
    showSearch : true
  };
  deviceServiceId = null;
  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(this.checkWidth)
  }
  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  render() {
    return (
      <AppBar
        position="fixed"
        color="default"
        className={classNames('header', this.props.open && 'active')}
      >
        <div className="search-and-show-menu">
          <Button
            color="inherit"
            aria-label="Open drawer"
            onClick={this.props.handleDrawerOpen}
            className={classNames('open-menu-btn', this.props.open && 'hidden')}>
            <MenuIcon className="menu-icon"/>
          </Button>

          <div className="search-and-user-info">
            {
              this.state.showSearch &&
                <SearchComponent/>
            }
            <AccountInfo/>
          </div>
        </div>

      </AppBar>
    )
  }

  checkWidth = ({width}) => {
    let showSearch = false;
    if(width > 1024) {
      showSearch = true;
    }
    if(this.state.showSearch !== showSearch) {
      this.setState({
        showSearch
      });
    }
  }
}
