import {generateReducer} from '../utils';
import {
  loginActionTypes,
  logoutActionTypes,
  registrationActionTypes} from '../../models/auth';

const initialState = {
  isAuthorized: false,
  fetching: false,
};

const loginFailReducer = (state) => {
  return {
    ...state,
    fetching: false,
  }
};

const loginInitReducer = (state) => {
  return {
    ...state,
    fetching: true,
  }
};

const loginSuccessReducer = (state) => {
  return {
    ...state,
    isAuthorized: true,
    fetching: false,
  };
};


export const auth = generateReducer(initialState, {
  [registrationActionTypes.REGISTRATION_SUCCESS_ACTION]: loginSuccessReducer,
  [loginActionTypes.LOGIN_SUCCESS_ACTION]: loginSuccessReducer,

  [loginActionTypes.LOGIN_INIT_ACTION]: loginInitReducer,

  [loginActionTypes.LOGIN_FAIL_ACTION]: loginFailReducer,

  [logoutActionTypes.LOGOUT_SUCCESS_ACTION] : (state) => {
    return {
      ...state,
      fetching: false,
      isAuthorized : false
    }
  }
});
