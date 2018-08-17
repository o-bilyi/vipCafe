import {baseHandler, generateReducer} from '../utils';

const initialState = {
  width: null,
  height: null,
};

export const globalState = generateReducer(initialState, {
  'WINDOW_SETTING_TYPE': baseHandler,
});
