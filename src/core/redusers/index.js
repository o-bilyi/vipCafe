import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {auth} from './auth';
import {userProfile} from './users';
import {billings} from './sales';
import {statistics} from './stats';
import {skypeInfo} from './skype';

export default combineReducers({
  routing,
  userProfile,
  auth,
  billings,
  skypeInfo,
  statistics,
  toastr : toastrReducer
});
