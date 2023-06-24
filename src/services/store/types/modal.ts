import { IBurgerIngredient } from '../../common/interfaces';

export enum ModalActionTypes {
  SELECT_ITEM = 'SELECT_ITEM',
  CLEAR_ITEM = 'CLEAR_ITEM',
}

interface ISelectItem {
  type: ModalActionTypes.SELECT_ITEM;
  item: IBurgerIngredient;
}

interface IClearItem {
  type: ModalActionTypes.CLEAR_ITEM;
}

export type ModalAction = ISelectItem | IClearItem;

export interface IModalState {
  currentIngredient: null | IBurgerIngredient;
}
