import {sharesAndOffersActionTypes} from '../models/shares-and-offers';

export function addTosharesAndOffers(item) {
  return {
    type: sharesAndOffersActionTypes.ADD_TO_SHARED_AND_OFFERS_ITEM_ACTION,
    payload: {
      item : {
        ...item
      }
    }
  };
}
