import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {NavLink, Link} from 'react-router-dom';
import {DeviceSizeService} from 'utilits/index';
import SearchComponent from 'shared/components/search/Search.component';
import AccountInfo from 'shared/components/account-info/AccountInfo.component';
import {ListItem,IconButton, Button, AppBar, Drawer, List} from '@material-ui/core';
import {firstMenuItems, secondMenuItems, managerBlock} from './menuItems/Items.component';

import Logo from 'assets/svg/logo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import connect from 'react-redux/es/connect/connect';
import Dialog from '@material-ui/core/Dialog/Dialog';

class Wrapper extends React.Component {
  static propTypes = {
    auth: PropTypes.bool
  };

  state = {
    open: false,
    openWarningModal: false,
    openManagerModal: false,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  _handleOpenWarningModal = () => {
    this.setState({
      openWarningModal: !this.state.openWarningModal,
    });
  };

  _handleOpenManagerModal = () => {
    this.setState({
      openManagerModal: !this.state.openManagerModal,
    });
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  /**
   * get customSelect items
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
        <div className='menu-toolbar'>
          <IconButton className="hidden-menu-btn" onClick={this.handleDrawerClose}>
            <ArrowBackIcon className="arrow-back-icon"/>
          </IconButton>
          <Link to={navigationScheme.login} className="logo-link">
            <Logo className="icon-logo"/>
          </Link>
          <SearchComponent/>
        </div>
      );
    }
    return (
      <div className='menu-toolbar'>
        <IconButton className="hidden-menu-btn" onClick={this.handleDrawerClose}>
          <ArrowBackIcon className="arrow-back-icon"/>
        </IconButton>
        <Link to={navigationScheme.login} className="logo-link">
          <Logo className="icon-logo"/>
        </Link>
      </div>
    );
  };

  _getOrderButtons = () => {
     if(this.props.auth) {
       return (
         <List className="menu-item-wrap">
           {this._getMenuItems(secondMenuItems)}
           <Link to={navigationScheme.basket} className={classNames('to-order',
             !this.state.open && 'hidden')}>ОФОРМИТИ ЗАМОВЛЕННЯ</Link>
         </List>
       )
    }
    return (
      <List className="menu-item-wrap" onClick={this._handleOpenWarningModal}>
        <div className="pointer-events">
          {this._getMenuItems(secondMenuItems)}
          <Link to={navigationScheme.login} className={classNames('to-order',
            !this.state.open && 'hidden')}>Зайти</Link>
        </div>
      </List>
    )
  };

  render() {
    return (
      <div className='wrapper'>
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

            {
              this._getOrderButtons()
            }

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

                <Button className="send-to-manager" onClick={this._handleOpenManagerModal}>НАПИСАТИ МЕНЕДЖЕРУ</Button>
              </div>
              :
              <List className="menu-item-wrap" onClick={this._handleOpenManagerModal}>
                {managerBlock}
              </List>
          }
        </Drawer>

        <main className="content">
          {this.props.children}
        </main>

        <img src="/img/clover.png" alt="clever" className="clever-img"/>

        <Dialog
          scroll={'body'}
          open={this.state.openWarningModal}
          onClose={this._handleOpenWarningModal}
          className="goods-description-modal"
        >
          <div className="description-warning-item">
            Потрібно залогінитись.
            <Link to={navigationScheme.login}>Увійти</Link>
          </div>
        </Dialog>

        <Dialog
          scroll={'body'}
          open={this.state.openManagerModal}
          onClose={this._handleOpenManagerModal}
          className="goods-description-modal"
        >
          <div className="description-warning-item">
            <form action="feedback">
              <input type="text" placeholder="ваше ім'я"/>
              <Button className="send-to-manager">відправити</Button>
            </form>
          </div>
        </Dialog>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth : state.auth.isAuthorized
  };
};

export default connect(mapStateToProps)(Wrapper)
