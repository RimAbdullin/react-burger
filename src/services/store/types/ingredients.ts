import { IBurgerIngredient } from '../../common/interfaces';

export enum IngredientsActionTypes {
  GET_ITEMS_FAILED = 'GET_ITEMS_FAILED',
  GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS',
  GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST',
  SET_BUN = 'SET_BUN',
  INCREASE_ITEM = 'INCREASE_ITEM',
  DECREASE_ITEM = 'DECREASE_ITEM',
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
  id: null | string;
  bunName: null | string;
}

interface IIncreaseItem {
  type: IngredientsActionTypes.INCREASE_ITEM;
  itemId: string;
}

interface IDecreaseItem {
  type: IngredientsActionTypes.DECREASE_ITEM;
  itemId: string;
}

interface IGetItem {
  type: IngredientsActionTypes.GET_ITEM;
  id: null | string;
}

export type IngredientsAction =
  | IGetItemsFailed
  | IGetItemsSuccess
  | IGetItemsRequest
  | ISetBun
  | IIncreaseItem
  | IDecreaseItem
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
