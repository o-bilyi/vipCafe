import {archiveActionTypes} from '../models/archive';

export function addToArhive(item) {
  return {
    type: archiveActionTypes.ADD_ARCHIVE_ITEM_ACTION,
    payload: {
      item : {
        ...item
      }
    }
  };
}
