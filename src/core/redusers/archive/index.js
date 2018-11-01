import {generateReducer} from '../utils';
import {archiveActionTypes} from '../../models/archive';

const initialState = [];

const addHandler = (state, action) => {
  return [
    ...state,
    ...action.payload.item,
  ];
};

export const archive = generateReducer(initialState, {
  [archiveActionTypes.ADD_ARCHIVE_ITEM_ACTION]: addHandler,
});
