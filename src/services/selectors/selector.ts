import { RootState } from '../store/store';

export const getIngredientsSelector = (store: RootState) => store.ingredients;

export const getIngredientsConstructorSelector = (store: RootState) =>
  store.ingredientConstructor;

export const getOrderSelector = (store: RootState) => store.order;

export const getModalSelector = (store: RootState) => store.modal;

export const getRegistrationSelector = (store: RootState) => store.registration;

export const getUserSelector = (store: RootState) => store.user;

export const getForgotPasswordSelector = (store: RootState) =>
  store.forgotPassword;

export const getPasswordResetSelector = (store: RootState) =>
  store.passwordReset;

export const getWSSelector = (store: RootState) => store.ws;

export const getWSOrderSelector = (store: RootState) => store.wsOrder;
