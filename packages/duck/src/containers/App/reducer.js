import { combineReducers } from 'redux';

function loginReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  login: loginReducer,
});
