import {loginActionTypes} from 'core/models/auth';
// import {API_LINKS, HttpService} from 'services/HttpService';
// import {navigationScheme} from 'core/routes';
import {baseHandler} from 'core/redusers/utils';


export const loginSuccess = (payload, token) => {
  // HttpService.setToken(token);
  return baseHandler(loginActionTypes.LOGIN_SUCCESS_ACTION, payload);
};
const isAuthorized = true;
/**
 * @param email
 * @param pass
 * @return {*|Promise<Response>}
 */
export function loginAction(email, pass) {
  return dispatch => dispatch({
    type : loginActionTypes.LOGIN_SUCCESS_ACTION,
    payload : isAuthorized
  });
  // const body = JSON.stringify({
  //   username: name,
  //   password: pass,
  // });
  // return dispatch => {
  //   dispatch(baseHandler(loginActionTypes.LOGIN_INIT_ACTION, {name, pass}));
  //   const FAIL_ACTION = (res) => dispatch(baseHandler(loginActionTypes.LOGIN_FAIL_ACTION, {name, pass, res}));
  //   return new HttpService().handleStatusCodes({
  //     200: (res) => res.token ? dispatch(loginSuccess({name, pass}, res.token)) : FAIL_ACTION(),
  //     400: FAIL_ACTION,
  //     500: FAIL_ACTION,
  //   }).postRequest(API_LINKS.login, body);
  // };
}
