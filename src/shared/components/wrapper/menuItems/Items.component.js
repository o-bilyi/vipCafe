import React from 'react';
import {navigationScheme} from 'core';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import StoreIcon from '@material-ui/icons/Store';
import ArchiveIcon from '@material-ui/icons/Archive';
import TransformIcon from '@material-ui/icons/Transform';
import DescriptionIcon from '@material-ui/icons/Description';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const firstMenuItems = [
  <ListItem key={1} button className="menu-item">
    <NavLink
      className="menu-link"
      to={navigationScheme.catalog}
      activeClassName="active">
      <ListItemIcon>
        <StoreIcon className="menu-icon"/>
      </ListItemIcon>
      <ListItemText className="menu-text" primary="каталог товарів"/>
    </NavLink>
  </ListItem>,

  <ListItem key={2} button className="menu-item">
    <NavLink
      className="menu-link"
      to={navigationScheme.sharesAndOffers}
      activeClassName="active">
      <ListItemIcon>
        <DescriptionIcon className="menu-icon"/>
      </ListItemIcon>
      <ListItemText className="menu-text" primary="акції і пропозиції"/>
    </NavLink>
  </ListItem>,

  <ListItem key={3} button className="menu-item">
    <NavLink
      className="menu-link"
      to={navigationScheme.newArrivals} activeClassName="active">
      <ListItemIcon>
        <TransformIcon className="menu-icon"/>
      </ListItemIcon>
      <ListItemText className="menu-text" primary="нові поступлення"/>
    </NavLink>
  </ListItem>,
];

export const secondMenuItems = [
  <ListItem key={1} button className="menu-item">
    <NavLink
      className="menu-link"
      to={navigationScheme.archiveOfOrders} activeClassName="active">
      <ListItemIcon>
        <ArchiveIcon className="menu-icon"/>
      </ListItemIcon>
      <ListItemText className="menu-text" primary="архів замовлень"/>
    </NavLink>
  </ListItem>,

  <ListItem key={2} button className="menu-item">
    <NavLink
      className="menu-link"
      to={navigationScheme.basket} activeClassName="active">
      <ListItemIcon>
        <ShoppingCartIcon className="menu-icon"/>
      </ListItemIcon>
      <ListItemText className="menu-text" primary="позицій В кошику"/>
    </NavLink>
  </ListItem>,
];

export const managerBlock = (
  <ListItem
    button className="menu-item">
    <NavLink
      className="menu-link"
      to={navigationScheme.basket} activeClassName="active">
      <ListItemIcon>
        <DraftsIcon className="menu-icon"/>
      </ListItemIcon>
    </NavLink>
  </ListItem>
);
