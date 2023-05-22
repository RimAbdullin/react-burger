import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { cartIngredientsReducer } from './cartIngredientsReducer';
import { orderReducer } from './order';
import { currentIngredientReducer } from './currentIngredient';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cartIngredients: cartIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
