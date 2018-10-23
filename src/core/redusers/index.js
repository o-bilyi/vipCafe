import {auth} from './auth';
import {basket} from './basket';
import {archive} from './archive';
import {userProfile} from './users';
import {combineReducers} from 'redux';
import {sharesAndOffers} from './shares-and-offers';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

export default combineReducers({
  routing,
  auth,
  userProfile,
  sharesAndOffers,
  basket,
  archive,
  toastr : toastrReducer
});
