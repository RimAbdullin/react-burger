import { getOrderRequest } from '../../utils/burger-api';
import { IngredientsConstructorActionTypes } from '../store/types/ingredientsConstructor';
import { OrderActionTypes, OrderRequestBody } from '../store/types/order';
import { AppDispatch } from '../store/store';

// thunk
export function getOrderNumber(data: OrderRequestBody) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: OrderActionTypes.GET_ORDER_REQUEST,
    });
    getOrderRequest(data)
      .then((data) => {
        dispatch({
          type: OrderActionTypes.GET_ORDER_SUCCESS,
          orderNumber: data.order.number,
        });
        dispatch({
          type: IngredientsConstructorActionTypes.CLEAR_INGREDIENTS_CONSTRUCTOR,
        });
        return data.order.number;
      })
      .catch((err) => {
        dispatch({
          type: OrderActionTypes.GET_ORDER_FAILED,
        });
      });
  };
}

// Устанавливаем номер выбранного заказа.
export function setOrderNumber(orderNumber: number) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: OrderActionTypes.SET_ORDER_NUMBER,
      orderNumber: orderNumber,
    });
  };
}
