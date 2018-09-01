import {basketActionTypes} from '../models/basket';

export function addToBasket(item) {
  return {
    type: basketActionTypes.ADD_BASKET_ITEM_ACTION,
    payload: {
      item : {
        ...item
      }
    }
  };
}
