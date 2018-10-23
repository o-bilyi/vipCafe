// import {httpService} from 'services';
// import {baseHandler} from 'core/redusers/utils';
import {logoutActionTypes} from 'core/models/auth';
import {storageService} from '../../services';

// const body = JSON.stringify({message: 'bye'});

/**
 * @param payload
 * @return {{type, payload}}
 */
// export const logoutSuccessAction = payload => {
//   storageService.deleteLocal("user");
//   return baseHandler(logoutActionTypes.LOGOUT_SUCCESS_ACTION, payload)
// };
const isAuthorized = false;
/**
 * @return {*|Promise<Response>}
 */
export function logoutAction() {
  storageService.deleteLocal("user");
  return dispatch => dispatch({
    type : logoutActionTypes.LOGOUT_SUCCESS_ACTION,
    payload : isAuthorized
  });
  // return dispatch => {
  //   dispatch(baseHandler(logoutActionTypes.LOGOUT_INIT_ACTION));
  //   const FAIL_ACTION = () => dispatch(baseHandler(logoutActionTypes.LOGOUT_FAIL_ACTION));
  //   return new HttpService().handleStatusCodes({
  //     200: () => dispatch(logoutSuccessAction()),
  //     400: FAIL_ACTION,
  //     500: FAIL_ACTION,
  //   }).postRequest(API_LINKS.logout, body);
  // };
}
