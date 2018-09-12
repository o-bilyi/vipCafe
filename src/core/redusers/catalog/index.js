import {generateReducer} from '../utils';
import {catalogActionTypes} from '../../models/catalog';

const initialState = {
  items: [
    // {
    //   category : "coffee",
    //   id : 1,
    //   img : 'img/img-item.png',
    //   title : 'Lavazza Crema e Aroma Espresso Blue',
    //   properties : [{
    //     name : "капсульна",
    //     numberInPackage: 10000,
    //     numberInBox : 20
    //   }],
    //   numberInPackage: 10000,
    //   count : 1,
    //   price : 20,
    // },
    {
      id : 1,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      // properties : [{
      //   grounded : {
      //     text : 'мелена'
      //   },
      //   capsule : {
      //     text : 'капсульна'
      //   },
      //   cereal : {
      //     text : 'зернова'
      //   },
      //   numberInPackage: 10000,
      //   numberInBox : 20
      // }],
      properties : ['капсульна','капсульна'],
      numberInPackage: 10000,
      count : 1,
      price : 20,
    },
    {
      id : 2,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : ['капсульна','капсульна'],
      count : 3,
      price : 40,
      numberInPackage: 10000,
    },
    {
      id : 3,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : ['капсульна','капсульна'],
      count : 5,
      price : 25,
      numberInPackage: 10000,
    },
    {
      id : 4,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : ['капсульна','капсульна'],
      count : 5,
      price : 25,
      numberInPackage: 10000,
    },
    {
      id : 5,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : ['капсульна','капсульна'],
      count : 5,
      price : 25,
      numberInPackage: 10000,
    },
    {
      id : 6,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : ['капсульна','капсульна'],
      count : 5,
      price : 25,
      numberInPackage: 10000,
    },
    {
      id : 7,
      img : 'img/img-item.png',
      title : 'Lavazza Crema e Aroma Espresso Blue',
      properties : ['капсульна','капсульна'],
      count : 5,
      price : 25,
      numberInPackage: 10000,
    }
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
