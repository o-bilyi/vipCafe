import React from 'react';
import classNames from 'classnames';
import Logo from 'assets/svg/logo.svg';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {DeviceSizeService} from 'utilits/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchComponent from 'shared/components/search/Search.component';
import AccountInfo from 'shared/components/account-info/AccountInfo.component';
import {ListItem,IconButton, Button, AppBar, Drawer, List} from '@material-ui/core';
import {firstMenuItems, secondMenuItems, managerBlock} from './menuItems/Items.component';

export default class Wrapper extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  /**
   * get select items
   * @param array
   * @returns {*}
   * @private
   */

  _getMenuItems = (array) => {
    return array.map((item, key) => {
      return (
        <ListItem key={key} button className="menu-item">
          <NavLink
            className="menu-link"
            to={item.to} activeClassName="active">
            <ListItemIcon>
              <item.icon className="menu-icon"/>
            </ListItemIcon>
            <ListItemText className="menu-text" primary={item.text}/>
            {item.number}
          </NavLink>
        </ListItem>
      );
    });
  };

  _getToolbar = () => {
    if (DeviceSizeService.size.width < 1024) {
      return (
        <div className={classNames('menu-toolbar')}>
          <IconButton className="hidden-menu-btn" onClick={this.handleDrawerClose}>
            <ArrowBackIcon className="arrow-back-icon"/>
          </IconButton>
          <Logo className="icon-logo"/>
          <SearchComponent/>
        </div>
      );
    }
    return (
      <div className={classNames('menu-toolbar')}>
        <IconButton className="hidden-menu-btn" onClick={this.handleDrawerClose}>
          <ArrowBackIcon className="arrow-back-icon"/>
        </IconButton>
        <Logo className="icon-logo"/>
      </div>
    );
  };

  render() {
    return (
      <div className={classNames('wrapper')}>
        <AppBar
          position="fixed"
          color="default"
          className={classNames('header', this.state.open && 'active')}
        >
          <div className="search-and-show-menu">
            <Button
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames('open-menu-btn', this.state.open && 'hidden')}
            >
              <MenuIcon className="menu-icon"/>
            </Button>

            <div className="search-and-user-info">
              {
                DeviceSizeService.size.width > 1024
                ?
                  <SearchComponent/>
                :
                  null
              }

              <AccountInfo/>
            </div>
          </div>

        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames('navigation-menu', !this.state.open && 'active'),
          }}
          open={this.state.open}>

         {
           this._getToolbar()
         }

          <h2 className={classNames('menu-title',
            !this.state.open && 'hidden')}>Перегляньте:</h2>

          <List className="menu-item-wrap">
            {this._getMenuItems(firstMenuItems)}
          </List>

          <div className="order-items">
            <h2 className={classNames('menu-title',
              !this.state.open && 'hidden')}>Ваші замовлення:</h2>

            <List className="menu-item-wrap">
              {this._getMenuItems(secondMenuItems)}
              <Button className={classNames('to-order',
                !this.state.open && 'hidden')}>ОФОРМИТИ ЗАМОВЛЕННЯ</Button>
            </List>
          </div>

          {
            this.state.open
              ?
              <div className="manager-block">
                <h2 className="menu-title">Ваш менеджер:</h2>
                <p className="name-manager">Кравченко Анна</p>

                <div className="email-and-phone">
                  <a className="email-link" href="mailto:vipcafe@info">vipcafe@info</a>
                  <div className="separator"/>
                  <a className="phone-link" href="tel:+38 (095) 313 13 13">+38 (095) 313 13 13</a>
                </div>

                <Button className="send-to-manager">НАПИСАТИ МЕНЕДЖЕРУ</Button>
              </div>
              :
              <List>
                {managerBlock}
              </List>
          }
        </Drawer>

        <main className="content">
          {this.props.children}
        </main>

      </div>
    );
  }
}
