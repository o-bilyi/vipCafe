import {generateReducer} from '../utils';
import {catalogActionTypes} from '../../models/catalog';

const initialState = {
  items: [
    {
      category : "coffee",
      id : 1,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : [{
        name : "капсульна",
        numberInPackage: 100,
      }],
      count : 1,
      price : 20,
    },
    {
      category : "coffee",
      id : 2,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : [{
        name : "мелена",
        weight : 1000,
        numberInBox : 20
      }],
      count : 1,
      price : 20,
    },
    {
      category : "coffee",
      id : 3,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : [{
        name : "зернова",
        weight : 1000,
        numberInBox : 20
      }],
      count : 1,
      price : 20,
    },
    {
      category : "coffee",
      id : 4,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : [{
        name : "зернова",
        weight : 1000,
        numberInBox : 20
      }],
      count : 1,
      price : 20,
    },
    {
      category : "coffee",
      id : 5,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : [{
        name : "зернова",
        weight : 1000,
        numberInBox : 20
      }],
      count : 1,
      price : 20,
    },
    {
      category : "coffee",
      id : 6,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : [{
        name : "зернова",
        weight : 1000,
        numberInBox : 20
      }],
      count : 1,
      price : 20,
    },
  ]
};

const addHandler = (state, action) => {
  return {
    ...state,
    items : action.payload.item,
  };
};

export const catalog = generateReducer(initialState, {
  [catalogActionTypes.REMOVE_ALL_CATALOG_ITEMS_ACTION]: () => {
    return initialState;
  },
  [catalogActionTypes.ADD_CATALOG_ITEM_ACTION]: addHandler,
});
