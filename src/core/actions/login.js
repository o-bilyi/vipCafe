import {httpService} from 'services';
import {baseHandler} from 'core/redusers/utils';
import {loginActionTypes} from '../models/auth';

export const loginSuccess = (payload, token) => {
    console.warn(payload, token, " loginSuccess");
    token = "token";
    httpService.setToken(token);
    return baseHandler(loginActionTypes.LOGIN_SUCCESS_ACTION, payload);
};

export function loginAction() {
    return {
        type: loginActionTypes.LOGIN_SUCCESS_ACTION,
        payload: {
            isAuthorized : true
        },
    };
    // const body = JSON.stringify({
    //   email: email,
    //   password: pass,
    // });
    // return dispatch => {
    //   dispatch(baseHandler(loginActionTypes.LOGIN_INIT_ACTION, {email, pass}));
    //   const FAIL_ACTION = (res) => dispatch(baseHandler(loginActionTypes.LOGIN_FAIL_ACTION, {email, pass, res}));
    //   return httpService.handleStatusCodes({
    //     200: (res) => res.token ? dispatch(loginSuccess({email, pass}, res.token)) : FAIL_ACTION(),
    //     400: FAIL_ACTION,
    //     500: FAIL_ACTION,
    //   }).postRequest(API_LINKS.login, body);
    // };
}
