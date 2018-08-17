import {auth} from './auth';
import {userProfile} from './users';
import {combineReducers} from 'redux';
import {globalState} from './global-state';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

export default combineReducers({
  routing,
  globalState,
  userProfile,
  auth,
  toastr : toastrReducer
});
