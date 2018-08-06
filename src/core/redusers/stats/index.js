import {statsActionTypes} from '../../models/stats';
import {generateReducer} from '../utils';
import {logoutActionTypes} from '../../models/auth';

const initialState = {
  users: {
    count: null,
    newShows: null,
    newUsers: null,
  },
  topFans: [],
};

export const statistics = generateReducer(initialState, {
  /**
   * Listen logout action for cleaning user data after logout
   * @param state
   * @return {{fetching: boolean, userISAuthorized: boolean}}
   */
  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: () => {
    return initialState;
  },
  [statsActionTypes.GET_STATS_USERS_SUCCESS_ACTION]: (state, action) => {
    return {
      ...state,
      users : {
        ...state.users,
        ...action.payload
      }
    };
  },
  [statsActionTypes.GET_TOP_FANS_SUCCESS_ACTION]: (state, action) => {
    return {
      ...state,
      topFans : action.payload
    };
  },
});
