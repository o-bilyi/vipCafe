import {catalogActionTypes} from '../models/catalog';

export function addToCatalog(item) {
  return {
    type: catalogActionTypes.ADD_CATALOG_ITEM_ACTION,
    payload: {
      item : {
        ...item
      }
    },
  };
}
