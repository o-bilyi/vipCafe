import {API_LINKS, httpService} from 'services';
import {baseHandler} from 'core/redusers/utils';
import {registrationActionTypes} from 'core/models/auth';

/**
 * @param username
 * @param password
 * @param token
 * @return {*|Promise<Response>}
 */
export function registrationAction(username, password, token) {
  const body = JSON.stringify({
    username,
    password,
    token,
  });
  return dispatch => {
    dispatch(baseHandler(registrationActionTypes.REGISTRATION_INIT_ACTION, {username, password}));

    const FAIL_ACTION = () => dispatch(baseHandler(registrationActionTypes.REGISTRATION_FAIL_ACTION, {username, password}));

    return new httpService().handleStatusCodes({
      200: (res) => {
        if(res.token) {
          httpService.setToken(res.token);
          dispatch(baseHandler(registrationActionTypes.REGISTRATION_SUCCESS_ACTION,{username, password}));
        } else {
          FAIL_ACTION();
        }
      },
      400 : FAIL_ACTION,
      500: FAIL_ACTION,
    }).postRequest(API_LINKS.register, body);
  };
}
