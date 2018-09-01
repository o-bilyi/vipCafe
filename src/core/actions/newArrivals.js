import {newArrivalsActionTypes} from '../models/newArrivals';

export function addToNewArrivals(item) {
  return {
    type: newArrivalsActionTypes.ADD_NEW_ARRIVALS_ITEM_ACTION,
    payload: {
      item : {
        ...item
      }
    }
  };
}
