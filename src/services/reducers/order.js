import {
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  SET_ORDER_NUMBER,
} from '../actions/order';

const initialState = {
  orderNumber: 5,
  orderRequest: true,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.orderNumber,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case SET_ORDER_NUMBER: {
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
