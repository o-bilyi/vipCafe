import React from 'react';
import {navigationScheme} from 'core';
import CountItem from './CountItem.component';
import {ListItem,ListItemIcon} from '@material-ui/core';

import StoreIcon from 'assets/svg/navigation-menu/store.svg';
import DraftsIcon from 'assets/svg/navigation-menu/envelope.svg';
import ArchiveIcon from 'assets/svg/navigation-menu/archive.svg';
import TransformIcon from 'assets/svg/navigation-menu/new-item.svg';
import ShoppingCartIcon from 'assets/svg/navigation-menu/basket.svg';
import SharedAndOffersIcon from 'assets/svg/navigation-menu/shares-and-offers.svg';

export const firstMenuItems = [
  {
    to: navigationScheme.catalog,
    icon: StoreIcon,
    text: 'каталог товарів'
  },
  {
    to: {
      pathname: navigationScheme.sharesAndOffers,
      state: "shared",
    },
    icon: SharedAndOffersIcon,
    text: 'акції і пропозиції'
  },
  {
    to: {
      pathname: navigationScheme.sharesAndOffers,
      state: "offers",
    },
    icon: TransformIcon,
    text: 'нові поступлення',
    number: <CountItem storageTarget="sharesAndOffers"/>,
  },
];

export const secondMenuItems = [
  {
    to: navigationScheme.archive,
    icon: ArchiveIcon,
    text: 'архів замовлень',
    number: <CountItem storageTarget="archive"/>,
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
    <div className="menu-link">
      <ListItemIcon>
        <DraftsIcon className="menu-icon"/>
      </ListItemIcon>
    </div>
  </ListItem>
);
