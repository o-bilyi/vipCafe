import {salesActionTypes} from '../../models/billings';
import {generateReducer} from '../utils';
import {logoutActionTypes} from '../../models/auth';

const initialState = {
  sales : []
};

export const billings = generateReducer(initialState, {
  /**
   * Listen logout action for cleaning user data after logout
   * @param state
   * @return {{fetching: boolean, userISAuthorized: boolean}}
   */
  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: () => {
    return initialState;
  },
  [salesActionTypes.GET_MONTHLY_SALES_SUCCESS_ACTION]: (state, action) => {
    return {
      ...state,
      sales : action.payload
    };
  },
});