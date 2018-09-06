import React from 'react';
import Loadable from 'react-loadable';
import {Route} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

export const navigationScheme = {
  login : '/',
  signUp : '/sign-up',
  forgotPassword: '/forgot-password',

  basket : '/basket',
  catalog : '/catalog',
  archive : '/archive',
  dashboard: '/dashboard',
  newArrivals : '/new-arrivals',
  privacyPolicy : '/privacy-policy',
  sharesAndOffers : '/shares-and-offers',

  archiveOrder : '/archive-order'
};

const Loading = () => <div className="loader"><CircularProgress style={{color : green[500]}}/></div>;

export const MAIN_ROUTES = [
  {
    path: navigationScheme.login,
    exact: true,
    component: () => import('../modules/auth/login/Login.module')
  },
  {
    path: navigationScheme.catalog,
    exact: true,
    component: () => import('../modules/catalog/Catalog.module')
  },
  {
    path: navigationScheme.dashboard,
    exact: true,
    component: () => import('../modules/dashboard/Dashboard.module')
  },
  {
    path: navigationScheme.signUp,
    exact: true,
    component: () => import('../modules/auth/sign-up/SignUp.module')
  },
  {
    path: navigationScheme.forgotPassword,
    exact: true,
    component: () => import('../modules/auth/forgot-pass/ForgotPass.module')
  },
  {
    path: navigationScheme.privacyPolicy,
    exact: true,
    component: () => import('../modules/privacy-policy/PrivacyPolicy.module')
  },
  {
    path: navigationScheme.basket,
    exact: true,
    component: () => import('../modules/basket/Basket.module')
  },
  {
    path: navigationScheme.newArrivals,
    exact: true,
    component: () => import('../modules/new-arrivals/NewArrivals.module')
  },
  {
    path: navigationScheme.sharesAndOffers,
    exact: true,
    component: () => import('../modules/shared-and-offers/SharesAndOffers.module')
  },
  {
    path: navigationScheme.archive,
    exact: true,
    component: () => import('../modules/archive/Archive.module')
  },
  {
    path: navigationScheme.archiveOrder,
    component: () => import('../modules/archive/components/ArchiveOrder.component')
  },
  {
    component: () => import('../modules/404/Error.module')
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
