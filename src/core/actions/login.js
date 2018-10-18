import {httpService} from 'services';
import {loginActionTypes} from '../models/auth';

const baseHandler = (type, data) => {
  return {
    type,
    payload: data,
  };
};

export const loginSuccess = (payload) => {
  return baseHandler(loginActionTypes.LOGIN_SUCCESS_ACTION, payload);
};

export function loginAction(cred) {
  // const body = JSON.stringify({
  //   email: email,
  //   password: pass,
  // });
  return dispatch => {
    dispatch(baseHandler(loginActionTypes.LOGIN_INIT_ACTION, {cred}));
    const FAIL_ACTION = (res) => dispatch(baseHandler(loginActionTypes.LOGIN_FAIL_ACTION, {res}));
    return httpService.handleStatusCodes({
      200: (res) => dispatch(baseHandler(loginActionTypes.LOGIN_SUCCESS_ACTION, res.user)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(httpService.URLS.login + `?mail=${cred.email}&pass=${cred.pass}`);
  };
}
