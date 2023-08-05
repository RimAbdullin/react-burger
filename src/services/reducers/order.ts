import {
  IOrderState,
  OrderAction,
  OrderActionTypes,
} from '../store/types/order';

export const orderInitialState: IOrderState = {
  orderNumber: 0,
  orderRequest: true,
  orderFailed: false,
};

export const orderReducer = (
  state: IOrderState = orderInitialState,
  action: OrderAction
): IOrderState => {
  switch (action.type) {
    case OrderActionTypes.GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case OrderActionTypes.GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.orderNumber,
      };
    }
    case OrderActionTypes.GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case OrderActionTypes.SET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: action.orderNumber,
      };
    }
    default: {
      return state;
    }
  }
};
