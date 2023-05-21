import { getIngredients } from '../../utils/burger-api';

export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

// thunk
export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getIngredients()
      .then((data) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}
