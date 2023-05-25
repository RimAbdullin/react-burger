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
        dispatch(setBun(bunName));
        return data.data;
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}

// Устанавливаем выбранную булку.
export function setBun(bunName) {
  return function (dispatch) {
    dispatch({
      type: SET_BUN,
      bunName: bunName,
    });
  };
}

// Добавляем новый ингредиент в конструктор.
export function addItem(item) {
  return function (dispatch) {
    dispatch({
      type: ADD_ITEM_CONSTRUCTOR,
      item: item,
    });
  };
}

// Удаляем ингредиент из конструктора.
export function deleteItem(item) {
  return function (dispatch) {
    dispatch({
      type: DELETE_ITEM_CONSTRUCTOR,
      item: { ...item },
    });
  };
}

// Выбираем текущий ингредиент.
export function selectItem(item) {
  return function (dispatch) {
    dispatch({
      type: SELECT_ITEM,
      item: item,
    });
  };
}

// Сбрасываем текущий ингредиент.
export function clearItem() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_ITEM,
    });
  };
}
