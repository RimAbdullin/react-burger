import { logout, refresh, getUser, login } from '../../utils/burger-api';

export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';

export const POST_REFRESH_TOKEN_FAILED = 'POST_REFRESH_TOKEN_FAILED';
export const POST_REFRESH_TOKEN_SUCCESS = 'POST_REFRESH_TOKEN_SUCCESS';
export const POST_REFRESH_TOKEN_REQUEST = 'POST_REFRESH_TOKEN_REQUEST';

export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';

export const SET_AUTH = 'SET_AUTH';
export const SET_USER = 'SET_USER';

export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';

export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';

// thunk
export function loginThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });
    login(form)
      .then((data) => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          data: data,
        });

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        dispatch({
          type: SET_AUTH,
          value: true,
        });
        dispatch({
          type: SET_USER,
          user: data.user,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGIN_FAILED,
        });
      });
  };
}

export function refreshThunk(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: POST_REFRESH_TOKEN_REQUEST,
    });
    refresh(refreshToken)
      .then((data) => {
        dispatch({
          type: POST_REFRESH_TOKEN_SUCCESS,
          data: data,
        });

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        dispatch({
          type: SET_AUTH,
          value: true,
        });

        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_REFRESH_TOKEN_FAILED,
        });
      });
  };
}

export function logoutThunk(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });
    logout(refreshToken)
      .then((data) => {
        dispatch({
          type: POST_LOGOUT_SUCCESS,
          data: data,
        });

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        dispatch({
          type: SET_AUTH,
          value: false,
        });
        dispatch({
          type: SET_USER,
          user: {},
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGOUT_FAILED,
        });
      });
  };
}

export function getUserThunk(accessToken) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser(accessToken)
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
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
          type: GET_USER_FAILED,
        });
      });
  };
}

export function patchUserThunk(form) {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    login(form)
      .then((data) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          data: data,
        });

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        dispatch({
          type: SET_AUTH,
          value: true,
        });
        dispatch({
          type: SET_USER,
          user: data.user,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
      });
  };
}
