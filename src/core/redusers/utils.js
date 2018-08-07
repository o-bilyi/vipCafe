/**
 * @param initialState {object}
 * @param handlers {object}
 * @return {Function}
 * @example
 *  generateReducer(
 *  {SomeData: true},
 *  {
 *    CHANGE_SOME_DATA: (state, action) => {
 *      return {...state, SomeData: false};
 *    },
 *  },
 *  )
 */

export function generateReducer(initialState, handlers) {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  }
}

/**
 * @param state
 * @param action
 * @return {{}}
 */
export const baseHandler = (state, action) => {
  return {
    ...state,
    ...action.payload
  }
};
