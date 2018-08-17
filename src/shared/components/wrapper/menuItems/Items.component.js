import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import ReportIcon from '@material-ui/icons/Report';

import {Button} from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

export const firstMenuItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="каталог товарів" />
    </ListItem>

    <Divider/>

    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="акції і пропозиції" />
    </ListItem>

    <Divider/>

    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="нові поступлення" />
    </ListItem>
  </div>
);

export const secondMenuItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="архів замовлень" />
    </ListItem>

    <Divider/>

    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="позицій В кошику" />
    </ListItem>
  </div>
);

export const managerBlock = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>

      <h2 className="title">Ваш менеджер:</h2>
      <p className="name-manager">Кравченко Анна</p>

      <div className="email-and-phone">
        <a href="mailto:vipcafe@info">vipcafe@info</a>
        <div className="separator"/>
        <a href="tel:+38 (095) 313 13 13">+38 (095) 313 13 13</a>
      </div>

      <Button classes="send-to-manager">НАПИСАТИ МЕНЕДЖЕРУ</Button>
    </ListItem>
  </div>
);
