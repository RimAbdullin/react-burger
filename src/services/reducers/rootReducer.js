import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { ingredientsConstructorReducer } from './ingredientsConstructor';
import { registrationReducer } from './registration';
import { loginReducer } from './login';
import { refreshReducer } from './refresh';
import { logoutReducer } from './logout';
import { userReducer } from './user';
import { forgotPasswordReducer } from './forgot-password';
import { passwordResetReducer } from './password-reset';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientConstructor: ingredientsConstructorReducer,
  order: orderReducer,
  modal: modalReducer,
  registration: registrationReducer,
  login: loginReducer,
  refresh: refreshReducer,
  logout: logoutReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  passwordReset: passwordResetReducer,
  auth: authReducer,
});
