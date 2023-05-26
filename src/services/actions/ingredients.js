import { getIngredients } from '../../utils/burger-api';

export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';

export const DELETE_ITEM_CONSTRUCTOR = 'DELETE_ITEM_CONSTRUCTOR';
export const ADD_ITEM_CONSTRUCTOR = 'ADD_ITEM_CONSTRUCTOR';

export const SELECT_ITEM = 'SELECT_ITEM';
export const CLEAR_ITEM = 'CLEAR_ITEM';

export const SET_BUN = 'SET_BUN';

// thunk
export function getIngredientsItems(bunName) {
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
        dispatch({
          type: SET_BUN,
          bunName: bunName,
        });
        return data.data;
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}
