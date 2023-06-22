import { IBurgerIngredient } from '../../common/interfaces';

export enum IngredientsConstructorActionTypes {
  DELETE_ITEM_CONSTRUCTOR = 'DELETE_ITEM_CONSTRUCTOR',
  ADD_ITEM_CONSTRUCTOR = 'ADD_ITEM_CONSTRUCTOR',
  CLEAR_INGREDIENTS_CONSTRUCTOR = 'CLEAR_INGREDIENTS_CONSTRUCTOR',
}

interface IDeleteItemConstructor {
  type: IngredientsConstructorActionTypes.DELETE_ITEM_CONSTRUCTOR;
  item: IBurgerIngredient;
}

interface IAddItemConstructor {
  type: IngredientsConstructorActionTypes.ADD_ITEM_CONSTRUCTOR;
  item: IBurgerIngredient;
}

interface IClearIngredientsConstructor {
  type: IngredientsConstructorActionTypes.CLEAR_INGREDIENTS_CONSTRUCTOR;
}
export type IngredientsConstructorAction =
  | IDeleteItemConstructor
  | IAddItemConstructor
  | IClearIngredientsConstructor;

export interface IBurgerIngredientsConstructorState {
  ingredientsConstructor: IBurgerIngredient[];
}
