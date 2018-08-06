import React from 'react';
import Loadable from 'react-loadable';
import {Route} from 'react-router-dom';

export const navigationScheme = {
  home: '/',
  dashboard: '/dashboard',
  dashboardProfile: '/dashboard/profile',
  dashboardProfileChangePassword: '/dashboard/profile/change-password',
  dashboardSettings: '/dashboard/settings',
  dashboardSkype: '/dashboard/skype',
  dashboardPayPal: '/dashboard/payPal',
  forgotPassword: '/forgot-password',
};

const Loading = () => <div className="loader">Loading ...</div>;

// export const PROFILE_ROUTES = [
//   {
//     path : navigationScheme.dashboardProfile,
//     exact: true,
//     component: () => import('../modules/profile/Profile.module')
//   },
//   {
//     path : navigationScheme.dashboardProfileChangePassword,
//     exact: true,
//     component: () => import('../modules/change-password/ChangePassword.module')
//   },
// ];
//
// export const DASHBOARD_ROUTES = [
//   {
//     path: navigationScheme.dashboard,
//     exact: true,
//     component: () => import('../modules/dashboard/Dashboard.module'),
//   },
//   {
//     path: navigationScheme.dashboardProfile,
//     component: () => import('../modules/profile/index')
//   },
//   {
//     path: navigationScheme.dashboardSettings,
//     component: () => import('../modules/dashboard-settings/DashboardSettings.module'),
//   },
//   {
//     path: navigationScheme.dashboardSkype,
//     component: () => import('../modules/skype/Skype.module'),
//   },
//   {
//     path: navigationScheme.dashboardPayPal,
//     component: () => import('../modules/pay-pal/PayPal.module'),
//   },
// ];

export const MAIN_ROUTES = [
  {
    path: navigationScheme.home,
    exact: true,
    component: () => import('../modules/catalog/catalog.module')
  },
  // {
  //   path: navigationScheme.connect,
  //   component: () => import('../modules/connect/Connect.module')
  // },
  // {
  //   path: navigationScheme.dashboard,
  //   component: () => import('../modules/dashboard'),
  //   routes: DASHBOARD_ROUTES,
  // },
  // {
  //   path: navigationScheme.forgotPassword,
  //   component: () => import('../modules/forgot-pass/ForgotPass.module'),
  // }
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
