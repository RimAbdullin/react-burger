import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { ingredientsConstructorReducer } from './ingredientsConstructor';
import { registrationReducer } from './registration';
import { userReducer } from './user';
import { forgotPasswordReducer } from './forgot-password';
import { passwordResetReducer } from './password-reset';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientConstructor: ingredientsConstructorReducer,
  order: orderReducer,
  modal: modalReducer,
  registration: registrationReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  passwordReset: passwordResetReducer,
  ws: wsReducer,
});
