import { getUser, updateUser } from '../../utils/burger-api';

export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';

export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

export const SET_AUTH = 'SET_AUTH';
export const SET_USER = 'SET_USER';

// thunk
export function getUserThunk(token) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser(token)
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
          data: data,
        });

        return data;
      })
      .catch((err) => {
        console.log('=== err', err);
        // {"success":false,"message":"jwt expired"}
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
        dispatch({
          type: UPDATE_USER_SUCCESS,
          data: data,
        });

        dispatch({
          type: SET_USER,
          user: data.user,
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
