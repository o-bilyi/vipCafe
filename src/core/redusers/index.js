import {auth} from './auth';
import {userProfile} from './users';
import {basket} from './basket';
import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

export default combineReducers({
  routing,
  userProfile,
  auth,
  basket,
  toastr : toastrReducer
});
