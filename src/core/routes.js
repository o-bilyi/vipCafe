import React from 'react';
import Loadable from 'react-loadable';
import {Route} from 'react-router-dom';

export const navigationScheme = {
  home: '/', //default open catalog page
  basket : '/basket',
  dashboard: '/dashboard',
  createUser: '/create-user',
  newArrivals : '/new-arrivals',
  forgotPassword: '/forgot-password',
  sharesAndOffers : '/shares-and-offers',
  archiveOfOrders : '/archive-of-orders'
};

const Loading = () => <div className="loader">Loading ...</div>;

export const MAIN_ROUTES = [
  {
    path: navigationScheme.home,
    exact: true,
    component: () => import('../modules/catalog/Catalog.module')
  },
  {
    path: navigationScheme.dashboard,
    exact: true,
    component: () => import('../modules/dashboard/Dashboard.module'),
  }
];

export function generateRoutes(routes) {
  return routes.map((i, k) => {
    const component = Loadable({
      loader: i.component,
      loading: Loading,
    });
    return <Route {...i} component={component} key={k}/>;
  });
}
