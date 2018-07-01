/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  const middlewares = [thunk, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  let composeEnhancers = compose;
  /* eslint-disable no-underscore-dangle */
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }
  /* eslint-enable */

  const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  return store;
}
