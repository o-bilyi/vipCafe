import {logoutActionTypes, loginActionTypes} from '../../models/auth';
import {generateReducer, baseHandler} from '../utils';

const initialState = {
  id : null,
  f_name : null,
  l_name : null,
  p_name : null,
  mail : null,
  tel : {
    number : null,
    telegram : null,
    viber : null,
  },
  mobile : null,
  site : null,
  city : null,
  company : null,
  trade_format : null,
  delivery : null,
  thumbnail : null,
  discount : 30,
};

export const userProfile = generateReducer(initialState, {
  /**
   * Listen logout action for cleaning user data after logout
   * @param state
   * @return {{fetching: boolean, isAuthorized: boolean}}
   */
  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: () => initialState,
  [loginActionTypes.LOGIN_SUCCESS_ACTION]: baseHandler,
});
