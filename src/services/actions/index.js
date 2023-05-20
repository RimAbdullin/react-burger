import { getItemsRequest, getOrderRequest } from '../fakeApi';

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getItemsRequest().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      }
    });
  };
}

export function getRecommendedItems() {
  return function (dispatch) {
    dispatch({
      type: GET_RECOMMENDED_ITEMS_REQUEST,
    });
    getRecommendedItemsRequest().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_RECOMMENDED_ITEMS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_RECOMMENDED_ITEMS_FAILED,
        });
      }
    });
  };
}
