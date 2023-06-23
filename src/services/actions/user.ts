import {
  getUserRequest,
  updateUserRequest,
  refreshTokenRequest,
  loginRequest,
  logoutRequest,
} from '../../utils/burger-api';

import { getCookie, removeCookie, saveTokens } from '../common/common';

export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';

export const POST_REFRESH_TOKEN_FAILED = 'POST_REFRESH_TOKEN_FAILED';
export const POST_REFRESH_TOKEN_SUCCESS = 'POST_REFRESH_TOKEN_SUCCESS';
export const POST_REFRESH_TOKEN_REQUEST = 'POST_REFRESH_TOKEN_REQUEST';

export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';

export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';

export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

export const RESET_STATE = 'RESET_STATE';

export const AUTH_CHECKED = 'AUTH_CHECKED';

// thunk

// check user is auth.
export const checkAuthThunk = () => (dispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUserThunk());
  }
  dispatch({ type: AUTH_CHECKED });
};

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
        if (err.message === 'jwt expired') {
          dispatch(refreshToken(updateUserThunk(form)));
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
        }
      });
  };
}

// refresh.
const refreshToken = (afterRefresh) => (dispatch) => {
  refreshTokenRequest().then((res) => {
    saveTokens(res.accessToken, res.refreshToken);
    dispatch(afterRefresh);
  });
};

// login.
export function loginThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });
    loginRequest(form)
      .then((data) => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          data: data,
        });

        saveTokens(data.accessToken, data.refreshToken);

        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGIN_FAILED,
        });
      })
      .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
  };
}

// refresh.
export function refreshTokenThunk() {
  return function (dispatch) {
    dispatch({
      type: POST_REFRESH_TOKEN_REQUEST,
    });
    refreshTokenRequest()
      .then((data) => {
        dispatch({
          type: POST_REFRESH_TOKEN_SUCCESS,
          data: data,
        });

        saveTokens(data.accessToken, data.refreshToken);

        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_REFRESH_TOKEN_FAILED,
        });
      });
  };
}

// logout.
export function logoutThunk() {
  return function (dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });
    logoutRequest()
      .then((data) => {
        localStorage.removeItem('refreshToken');

        dispatch({
          type: POST_LOGOUT_SUCCESS,
          data: data,
        });

        dispatch({
          type: RESET_STATE,
        });

        removeCookie('accessToken');

        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGOUT_FAILED,
        });
      });
  };
}
