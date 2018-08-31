import {basketActionTypes} from '../models/basket';

export function basketAction(items) {
  return dispatch => dispatch({
    type : basketActionTypes.ADD_BASKET_ITEM_ACTION,
    payload : items
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