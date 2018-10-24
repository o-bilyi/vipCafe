import {httpService, storageService} from 'services';
import {baseHandler} from 'core/redusers/utils';
import {logoutActionTypes} from 'core/models/auth';

// const body = JSON.stringify({message: 'bye'});

/**
 * @param payload
 * @return {{type, payload}}
 */
export const logoutSuccessAction = payload => {
  storageService.deleteLocal("user");
  return baseHandler(logoutActionTypes.LOGOUT_SUCCESS_ACTION, payload)
};
// const isAuthorized = false;
/**
 * @return {*|Promise<Response>}
 */
export function logoutAction() {
  // storageService.deleteLocal("user");
  // return dispatch => dispatch({
  //   type : logoutActionTypes.LOGOUT_SUCCESS_ACTION,
  //   payload : isAuthorized
  // });
  const hash = storageService.getLocal("user").session_id;
  return dispatch => {
    dispatch(baseHandler(logoutActionTypes.LOGOUT_INIT_ACTION, {hash}));
    const FAIL_ACTION = (res) => dispatch(baseHandler(logoutActionTypes.LOGOUT_FAIL_ACTION, {res}));
    return httpService.handleStatusCodes({
      200: () => dispatch(logoutSuccessAction()),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(httpService.URLS.logout + `?hash=${hash}`);
  };
}
