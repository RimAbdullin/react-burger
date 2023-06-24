export enum OrderActionTypes {
  GET_ORDER_FAILED = 'GET_ORDER_FAILED',
  GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
  GET_ORDER_REQUEST = 'GET_ORDER_REQUEST',
  SET_ORDER_NUMBER = 'SET_ORDER_NUMBER',
}

interface IGetOrderFailed {
  type: OrderActionTypes.GET_ORDER_FAILED;
}

interface IGetOrderSuccess {
  type: OrderActionTypes.GET_ORDER_SUCCESS;
  orderNumber: number;
}

interface IGetOrderRequest {
  type: OrderActionTypes.GET_ORDER_REQUEST;
}

interface ISetOrderNumber {
  type: OrderActionTypes.SET_ORDER_NUMBER;
  orderNumber: number;
}

export type OrderAction =
  | IGetOrderFailed
  | IGetOrderSuccess
  | IGetOrderRequest
  | ISetOrderNumber;

export interface IOrderState {
  orderNumber: number;
  orderRequest: boolean;
  orderFailed: boolean;
}

export interface OrderRequestBody {
  ingredients: string[];
}
