import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { ingredientsConstructorReducer } from './ingredientsConstructor';
import { registrationReducer } from './auth';
import { loginReducer } from './login';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientConstructor: ingredientsConstructorReducer,
  order: orderReducer,
  modal: modalReducer,
  registration: registrationReducer,
  login: loginReducer,
});
