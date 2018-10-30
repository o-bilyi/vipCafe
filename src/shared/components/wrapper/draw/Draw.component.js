import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {navigationScheme} from "core";
import {DeviceSizeService} from "utilits";
import {Link, NavLink} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog/Dialog";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchComponent from "../../search/Search.component";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {Button, Drawer, IconButton, List, ListItem, TextField} from "@material-ui/core";
import {firstMenuItems, managerBlock, secondMenuItems} from "../menuItems/Items.component";

import Logo from "assets/svg/logo.svg";

export default class DrawComponent extends React.Component {
  static propTypes = {
    auth : PropTypes.bool,
    open : PropTypes.bool,
    handleDrawerOpen : PropTypes.func,
    handleDrawerClose : PropTypes.func,
  };

  state = {
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

  _sendToManager = (event) => {
    event.preventDefault();
    console.warn("send", event.target);
  };

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
        <div className="menu-toolbar">
          <IconButton className="hidden-menu-btn" onClick={this.props.handleDrawerClose}>
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
      <div className="menu-toolbar">
        <IconButton className="hidden-menu-btn" onClick={this.props.handleDrawerClose}>
          <ArrowBackIcon className="arrow-back-icon"/>
        </IconButton>
        <Link to={navigationScheme.login} className="logo-link">
          <Logo className="icon-logo"/>
        </Link>
      </div>
    );
  };

  _getOrderButtons = () => {
    if (this.props.auth) {
      return (
        <List className="menu-item-wrap">
          {this._getMenuItems(secondMenuItems)}
          <Link to={navigationScheme.basket} className={classNames("to-order",
            !this.props.open && "hidden")}>ОФОРМИТИ ЗАМОВЛЕННЯ</Link>
        </List>
      );
    }
    return (
      <List className="menu-item-wrap" onClick={this._handleOpenWarningModal}>
        <div className="pointer-events">
          {this._getMenuItems(secondMenuItems)}
          <Link to={navigationScheme.login} className={classNames("to-order",
            !this.props.open && "hidden")}>Зайти</Link>
        </div>
      </List>
    );
  };

  render() {
    const {open} = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames("navigation-menu", !open && "active"),
        }}
        open={open}>

        {
          this._getToolbar()
        }

        <h2 className={classNames("menu-title",
          !open && "hidden")}>Перегляньте:</h2>

        <List className="menu-item-wrap">
          {this._getMenuItems(firstMenuItems)}
        </List>

        <div className="order-items">
          <h2 className={classNames("menu-title",
            !open && "hidden")}>Ваші замовлення:</h2>

          {
            this._getOrderButtons()
          }

        </div>

        {
          open
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

        <Dialog
          scroll={"body"}
          className="warning-modal"
          open={this.state.openWarningModal}
          onClose={this._handleOpenWarningModal}
          aria-labelledby="send to manager modal">
          <div className="description-warning-item">
            Потрібно залогінитись.
            <Link to={navigationScheme.login}>Увійти</Link>
          </div>
        </Dialog>
        <Dialog
          maxWidth={"xs"}
          className="send-to-manager-modal"
          open={this.state.openManagerModal}
          classes={{
            paper: "send-to-manager-modal-container"
          }}
          aria-labelledby="send to manager modal"
          onClose={this._handleOpenManagerModal}>
          <form className="send-to-manager-modal-form" onSubmit={this._sendToManager}>
            <div className="input-container">
              <TextField
                type="text"
                name="name"
                placeholder="ваше ім'я"
                className="form-input-wrap"
                InputProps={{
                  classes: {
                    root: "form-input",
                    input: "input-style",
                  },
                }}/>
            </div>
            <div className="input-container">
              <TextField
                name="tel"
                type="text"
                placeholder="ваше телефон"
                className="form-input-wrap"
                InputProps={{
                  classes: {
                    root: "form-input",
                    input: "input-style",
                  },
                }}/>
            </div>
            <div className="input-container">
              <TextField
                type="text"
                multiline
                name="tel"
                placeholder="ваше телефон"
                className="form-input-wrap"
                InputProps={{
                  classes: {
                    root: "form-input",
                    input: "input-style",
                  },
                }}/>
            </div>
            <Button
              variant="extendedFab"
              aria-label="login"
              className="submit-button"
              type="submit">відправити</Button>
          </form>
        </Dialog>
      </Drawer>
    )
  }
}
