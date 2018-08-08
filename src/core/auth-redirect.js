import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

export const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  authenticatingSelector: state => state.auth.fetching,
  allowRedirectBack: false,
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state => state.auth.userISAuthorized,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
});
