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
  privacyPolicy : '/privacy-policy',
  sharesAndOffers : '/shares-and-offers',

  archiveOrder : '/archive-order',
  checkoutOrder : '/checkout-order',

  sharedAndOffersSingleItem : '/single-item',
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
    path: navigationScheme.sharesAndOffers,
    exact: true,
    component: () => import('../modules/shared-and-offers/SharedAndOffers.module')
  },
  {
    path: navigationScheme.sharedAndOffersSingleItem,
    exact: true,
    component: () => import('../modules/shared-and-offers/components/SingleItem.component')
  },
  {
    path: navigationScheme.archive,
    exact: true,
    component: () => import('../modules/archive/Archive.module')
  },
  {
    path: navigationScheme.archiveOrder,
    exact: true,
    component: () => import('../modules/archive/components/ArchiveOrder.component')
  },
  {
    path: navigationScheme.checkoutOrder,
    exact: true,
    component: () => import('../modules/checkout-page/CheckoutPage.module')
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
