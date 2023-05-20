import { getIngredientsAsync } from '../../utils/burger-api';
import { NORMA_API } from '../../data/data';

export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    fetch(`${NORMA_API}/ingredients`)
      .then((res) => {
        console.log('=== res', res);
        console.log('=== res.data', res.json);
        console.log(res.success);
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.json,
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED,
          });
        }
      })
      .catch((err) => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}
