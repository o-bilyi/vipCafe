import {logoutActionTypes} from '../../models/auth';
import {usersProfileActionTypes} from '../../models/users';
import {generateReducer, baseHandler} from '../utils';

const initialState = {
  username: null,
  name: null,
  description : null,
  country: null,
  character : null,
  id : null,
  balance : null,
  rate : ""
};

export const userProfile = generateReducer(initialState, {
  /**
   * Listen logout action for cleaning user data after logout
   * @param state
   * @return {{fetching: boolean, userISAuthorized: boolean}}
   */
  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: () => {
    return initialState;
  },
  [usersProfileActionTypes.USER_PROFILE_SUCCESS_ACTION]: baseHandler,
  [usersProfileActionTypes.USER_BALANCE_SUCCESS_ACTION] : baseHandler
});
