import {generateReducer} from '../utils';
import {newArrivalsActionTypes} from '../../models/newArrivals';

const initialState = {
  items: []
};

const addHandler = (state, action) => {
  return {
    ...state,
    items : action.payload.item,
  };
};

export const newArrivals = generateReducer(initialState, {
  [newArrivalsActionTypes.ADD_NEW_ARRIVALS_ITEM_ACTION]: addHandler,
});
