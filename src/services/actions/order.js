import { getOrder } from '../../utils/burger-api';
import { CLEAR_INGREDIENTS_CONSTRUCTOR } from '../actions/ingredientsConstructor';

export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';

export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';

// thunk
export function getOrderNumber(data) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrder(data)
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: data.order.number,
        });
        dispatch({
          type: CLEAR_INGREDIENTS_CONSTRUCTOR,
        });
        return data.order.number;
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

// Устанавливаем номер выбранного заказа.
export function setOrderNumber(orderNumber) {
  return function (dispatch) {
    dispatch({
      type: SET_ORDER_NUMBER,
      orderNumber: orderNumber,
    });
  };
}
