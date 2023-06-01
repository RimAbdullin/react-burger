import { rootReducer } from '../reducers/rootReducer';
import { createStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, enhancer);
