import { combineReducers } from 'redux';

import { COUNTER_INCREMENT } from './actions';

function countReducer(state = 0, action) {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return state + action.payload;
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  count: countReducer,
});
