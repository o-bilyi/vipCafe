import {basketActionTypes} from '../../models/basket';
import {generateReducer} from '../utils';

const initialState = {
  items: [],
  price : 0,
  sale : 0
};
const calculatePrice = (items) => {
  let price = 0;
  items.forEach(i => {
    price += i.price * i.count
  });
  return price;
};

const changeAndAddHandler = (state, action) => {
  const item = action.payload.item;
  const newItems = state.items.filter((i) => item.id !== i.id);
  newItems.push(item);
  return {
    ...state,
    items : newItems,
    price : calculatePrice(newItems)
  };
};

export const basket = generateReducer(initialState, {
  [basketActionTypes.REMOVE_ALL_BASKET_ITEMS_ACTION]: () => {
    return initialState;
  },
  [basketActionTypes.ADD_BASKET_ITEM_ACTION]: changeAndAddHandler,
  [basketActionTypes.CHANGE_BASKET_ITEM_ACTION]: changeAndAddHandler,
});
