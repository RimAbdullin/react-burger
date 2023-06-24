import { rootReducer } from '../reducers/rootReducer';
import { createStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// const composeEnhancers =
//   (typeof window === 'object' &&
//     (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)) ||
//   compose
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, composeWithDevTools());

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
