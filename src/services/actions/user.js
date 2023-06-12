import { getUser, updateUser } from '../../utils/burger-api';

export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';

export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

// thunk
export function getUserThunk(token) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser(token)
      .then((data) => {
        // Проверяем внутренний статус ответа.
        if (!data.success) {
          dispatch({
            type: GET_USER_FAILED,
          });
          return;
        }

        dispatch({
          type: GET_USER_SUCCESS,
          data: data,
        });

        return data;
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}

export function updateUserThunk(token, form) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUser(token, form)
      .then((data) => {
        // Проверяем внутренний статус ответа.
        if (!data.success) {
          dispatch({
            type: UPDATE_USER_FAILED,
          });

          return;
        }

        dispatch({
          type: UPDATE_USER_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}
