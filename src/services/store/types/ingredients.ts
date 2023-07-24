import { IBurgerIngredient } from '../../common/interfaces';

export enum IngredientsActionTypes {
  GET_ITEMS_FAILED = 'GET_ITEMS_FAILED',
  GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS',
  GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST',
  SET_BUN = 'SET_BUN',
  GET_ITEM = 'GET_ITEM',
}

interface IGetItemsFailed {
  type: IngredientsActionTypes.GET_ITEMS_FAILED;
}

interface IGetItemsSuccess {
  type: IngredientsActionTypes.GET_ITEMS_SUCCESS;
  items: IBurgerIngredient[];
  bunName: null | string;
}

interface IGetItemsRequest {
  type: IngredientsActionTypes.GET_ITEMS_REQUEST;
}

interface ISetBun {
  type: IngredientsActionTypes.SET_BUN;
  bunName: null | string;
}

interface IGetItem {
  type: IngredientsActionTypes.GET_ITEM;
  id: string;
}

export type IngredientsAction =
  | IGetItemsFailed
  | IGetItemsSuccess
  | IGetItemsRequest
  | ISetBun
  | IGetItem;

export interface IBurgerIngredientsState {
  ingredients: IBurgerIngredient[];
  bun: IBurgerIngredient[];
  main: IBurgerIngredient[];
  sauce: IBurgerIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
  currentBun: null | IBurgerIngredient;
  currentIngredient: null | IBurgerIngredient;
}
