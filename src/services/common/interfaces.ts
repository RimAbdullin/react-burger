export interface IBurgerIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  id?: null | string;
  count?: number;
}

export interface IFeedOrderData {
  ingredients: string[];
  name: string;
  _id: string;
  status: string;
  number: number;
  createdAt: null | Date;
  updatedAt: null | Date;
}

export interface IFeedOrders {
  success: boolean;
  orders: IFeedOrderData[];
  total: number;
  totalToday: number;
}
