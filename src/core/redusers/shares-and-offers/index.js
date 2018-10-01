import {generateReducer} from '../utils';
import {sharesAndOffersActionTypes} from '../../models/shares-and-offers';

const initialState = {
  items: [
    {
      id: 1,
      type: 'shared',
      date: {
        start: '15.06.18',
        end: '15.07.18',
      },
      img: 'img/shares-1.jpg',
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sharedItems: [
        {
          id: 1,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties: [
            {
              name : "капсульна",
              numberInPackage: 100,
            }
          ],
          count: 1,
          price: 20,
        },
        {
          id: 2,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "мелена",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
        {
          id: 3,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "зернова",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
      ],
    },
    {
      id: 2,
      type: 'shared',
      date: {
        start: '15.06.18',
        end: '15.07.18',
      },
      img: 'img/shares-2.jpg',
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sharedItems: [
        {
          id: 1,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties: [
            {
              name : "капсульна",
              numberInPackage: 100,
            }
          ],
          count: 1,
          price: 20,
        },
        {
          id: 2,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "мелена",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
        {
          id: 3,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "зернова",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
      ],
    },
    {
      id: 3,
      type: 'shared',
      date: {
        start: '15.06.18',
        end: '15.07.18',
      },
      img: 'img/shares-3.jpg',
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sharedItems: [
        {
          id: 1,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties: [
            {
              name : "капсульна",
              numberInPackage: 100,
            }
          ],
          count: 1,
          price: 20,
        },
        {
          id: 2,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "мелена",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
        {
          id: 3,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "зернова",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
      ],
    },
    {
      id: 4,
      type: 'offers',
      date: {
        start: '15.06.18',
        end: '15.07.18',
      },
      img: 'img/shares-2.jpg',
      title: 'Lavazza Crema e Aroma Espresso Blue',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sharedItems: [
        {
          id: 1,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties: [
            {
              name : "капсульна",
              numberInPackage: 100,
            }
          ],
          count: 1,
          price: 20,
        },
        {
          id: 2,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "мелена",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
        {
          id: 3,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "зернова",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
      ],
    },
    {
      id: 5,
      type: 'offers',
      date: {
        start: '15.06.18',
        end: '15.07.18',
      },
      img: 'img/shares-3.jpg',
      title: 'Lavazza Crema e Aroma Espresso Blue',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sharedItems: [
        {
          id: 1,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties: [
            {
              name : "капсульна",
              numberInPackage: 100,
            }
          ],
          count: 1,
          price: 20,
        },
        {
          id: 2,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "мелена",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
        {
          id: 3,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "зернова",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
      ],
    },
    {
      id: 6,
      type: 'offers',
      date: {
        start: '15.06.18',
        end: '15.07.18',
      },
      img: 'img/shares-1.jpg',
      title: 'Lavazza Crema e Aroma Espresso Blue',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sharedItems: [
        {
          id: 1,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties: [
            {
              name : "капсульна",
              numberInPackage: 100,
            }
          ],
          count: 1,
          price: 20,
        },
        {
          id: 2,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "мелена",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
        {
          id: 3,
          img: 'img/img-item.png',
          title: 'Lavazza Crema e Aroma Espresso Blue',
          properties : [{
            name : "зернова",
            weight : 1000,
            numberInBox : 20
          }],
          count: 1,
          price: 20,
        },
      ],
    }
  ],
};

const addHandler = (state, action) => {
  return {
    ...state,
    items: action.payload.item,
  };
};

export const sharesAndOffers = generateReducer(initialState, {
  [sharesAndOffersActionTypes.ADD_TO_SHARED_AND_OFFERS_ITEM_ACTION]: addHandler,
});
