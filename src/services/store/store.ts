import { rootReducer } from '../reducers/rootReducer';
import { createStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), composeWithDevTools())
);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
