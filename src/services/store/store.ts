import { rootReducer } from '../reducers/rootReducer';
import { createStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ForgotPasswordAction } from './types/forgot-password';
import { IngredientsAction } from './types/ingredients';
import { IngredientsConstructorAction } from './types/ingredientsConstructor';
import { ModalAction } from './types/modal';
import { OrderAction } from './types/order';
import { PasswordResetAction } from './types/password-reset';
import { RegistrationAction } from './types/registration';
import { UserAction } from './types/user';
import { Action, ActionCreator } from 'redux';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { socketMiddleware } from '../middleware/socketMiddleware';
import { WSAction } from './types/ws';
import { NORMA_API_WS } from '../../data/data';

// const webSocketMiddleWare = socketMiddleware('');

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, socketMiddleware(NORMA_API_WS)),
    composeWithDevTools()
    // applyMiddleware(socketMiddleware(NORMA_API_WS))
  )
);

export type RootState = ReturnType<typeof rootReducer>;

export type ApplicationActions =
  | ForgotPasswordAction
  | IngredientsAction
  | IngredientsConstructorAction
  | ModalAction
  | OrderAction
  | PasswordResetAction
  | RegistrationAction
  | UserAction
  | WSAction;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, ApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, never, ApplicationActions>;
