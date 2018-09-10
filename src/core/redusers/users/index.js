import {logoutActionTypes} from '../../models/auth';
import {generateReducer, baseHandler} from '../utils';
import {usersProfileActionTypes} from '../../models/users';

const initialState = {
  id : null,
  name : null,
  email : null,
  lastName : null,
  surname : null,
  nameCompany : null,
  mobile : null,
  city : null,
  delivery : null,
  tradeFormat : null,
  sitePage : null,
  telegram : null,
  viber : null,
  discount : 30,
};

export const userProfile = generateReducer(initialState, {
  /**
   * Listen logout action for cleaning user data after logout
   * @param state
   * @return {{fetching: boolean, isAuthorized: boolean}}
   */
  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: () => {
    return initialState;
  },
  [usersProfileActionTypes.USER_PROFILE_SUCCESS_ACTION]: baseHandler,
});
