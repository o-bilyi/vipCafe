import {skypeActionTypes} from '../../models/skype';
import {baseHandler, generateReducer} from '../utils';
import {logoutActionTypes} from '../../models/auth';

const initialState = {
  loggedIn: false,
  showPrice: null,
  skypeId: null,
  updatedAt: null,
};

export const skypeInfo = generateReducer(initialState, {
  /**
   * Listen logout action for cleaning user data after logout
   * @param state
   * @return {{fetching: boolean, userISAuthorized: boolean}}
   */
  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: () => {
    return initialState;
  },
  [skypeActionTypes.GET_SKYPE_INFO_SUCCESS_ACTION] : baseHandler
});
