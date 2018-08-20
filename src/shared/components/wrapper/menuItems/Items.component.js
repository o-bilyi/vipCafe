import React from 'react';
import {navigationScheme} from 'core';
import {NavLink} from 'react-router-dom';
import CountItem from './CountItem.component';
import ListItem from '@material-ui/core/ListItem';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import StoreIcon from '@material-ui/icons/Store';
import ArchiveIcon from '@material-ui/icons/Archive';
import TransformIcon from '@material-ui/icons/Transform';
import DescriptionIcon from '@material-ui/icons/Description';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const firstMenuItems = [
  {
    to: navigationScheme.catalog,
    icon: StoreIcon,
    text: 'каталог товарів'
  },
  {
    to: navigationScheme.sharesAndOffers,
    icon: DescriptionIcon,
    text: 'акції і пропозиції'
  },
  {
    to: navigationScheme.newArrivals,
    icon: TransformIcon,
    text: 'нові поступлення'
  },
];

export const secondMenuItems = [
  {
    to: navigationScheme.archiveOfOrders,
    icon: ArchiveIcon,
    text: 'архів замовлень',
    number: <CountItem storageTarget="archiveOfOrders"/>,
  },
  {
    to: navigationScheme.basket,
    icon: ShoppingCartIcon,
    text: 'позицій в кошику',
    number: <CountItem storageTarget="basket"/>,
  },
];

export const managerBlock = (
  <ListItem button className="menu-item">
    <NavLink
      className="menu-link"
      to={navigationScheme.basket} activeClassName="active">
      <ListItemIcon>
        <DraftsIcon className="menu-icon"/>
      </ListItemIcon>
    </NavLink>
  </ListItem>
);
