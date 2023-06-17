import {
  getUserRequest,
  updateUserRequest,
  refreshTokenRequest,
} from '../../utils/burger-api';

import { saveTokens } from '../../services/common/common';

export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';

export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

export const RESET_STATE = 'RESET_STATE';

// thunk
// get user.
export function getUserThunk() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest()
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
          data: data,
        });

        return data;
      })
      .catch((err) => {
        if (err.message === 'jwt expired') {
          dispatch(refreshToken(getUserThunk()));
        } else {
          dispatch({
            type: GET_USER_FAILED,
            payload: err.message,
          });
        }
      });
  };
}

// update user.
export function updateUserThunk(form) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserRequest(form)
      .then((data) => {
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

const refreshToken = (afterRefresh) => (dispatch) => {
  refreshTokenRequest().then((res) => {
    saveTokens(res.accessToken, res.refreshToken);
    dispatch(afterRefresh);
  });
};
