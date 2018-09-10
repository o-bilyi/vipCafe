import {basketActionTypes} from '../models/basket';

export function addToBasket(item) {
  return {
    type: basketActionTypes.ADD_BASKET_ITEM_ACTION,
    payload: {
      item: {
        ...item,
      },
    },
  };
}

export function changeBasket(item) {
  return {
    type: basketActionTypes.CHANGE_BASKET_ITEM_ACTION,
    payload: {
      item: {
        ...item,
      },
    },
  };
}

export function clearBasket() {
  return {
    type: basketActionTypes.REMOVE_ALL_BASKET_ITEMS_ACTION
  };
}