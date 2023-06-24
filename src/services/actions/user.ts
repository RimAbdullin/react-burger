import { Dispatch } from 'react';
import {
  getUserRequest,
  updateUserRequest,
  refreshTokenRequest,
  loginRequest,
  logoutRequest,
} from '../../utils/burger-api';

import { getCookie, removeCookie, saveTokens } from '../common/common';
import {
  IUserLoginForm,
  IUserWithPassword,
  UserAction,
  UserActionTypes,
} from '../store/types/user';

// thunk

// check user is auth.
export const checkAuthThunk = () => (dispatch: Dispatch<UserAction>) => {
  if (getCookie('accessToken')) {
    // dispatch(getUserThunk());
    getUserThunk();
  }
  dispatch({ type: UserActionTypes.AUTH_CHECKED });
};

// get user.
export function getUserThunk() {
  return function (dispatch: Dispatch<UserAction>) {
    dispatch({
      type: UserActionTypes.GET_USER_REQUEST,
    });
    getUserRequest()
      .then((data) => {
        dispatch({
          type: UserActionTypes.GET_USER_SUCCESS,
          data: data,
        });

        return data;
      })
      .catch((err) => {
        if (err.message === 'jwt expired') {
          // dispatch(refreshToken(getUserThunk()));
          refreshToken(getUserThunk());
        } else {
          dispatch({
            type: UserActionTypes.GET_USER_FAILED,
            payload: err.message,
          });
        }
      });
  };
}

// update user.
export function updateUserThunk(form: IUserWithPassword) {
  return function (dispatch: Dispatch<UserAction>) {
    dispatch({
      type: UserActionTypes.UPDATE_USER_REQUEST,
    });
    updateUserRequest(form)
      .then((data) => {
        dispatch({
          type: UserActionTypes.UPDATE_USER_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((err) => {
        if (err.message === 'jwt expired') {
          // dispatch(refreshToken(updateUserThunk(form)));
          refreshToken(updateUserThunk(form));
        } else {
          dispatch({
            type: UserActionTypes.UPDATE_USER_FAILED,
          });
        }
      });
  };
}

// refresh.
const refreshToken =
  (afterRefresh: any) => (dispatch: Dispatch<UserAction>) => {
    refreshTokenRequest().then((res) => {
      saveTokens(res.accessToken, res.refreshToken);
      dispatch(afterRefresh);
    });
  };

// login.
export function loginThunk(form: IUserLoginForm) {
  return function (dispatch: Dispatch<UserAction>) {
    dispatch({
      type: UserActionTypes.POST_LOGIN_REQUEST,
    });
    loginRequest(form)
      .then((data) => {
        dispatch({
          type: UserActionTypes.POST_LOGIN_SUCCESS,
          data: data,
        });

        saveTokens(data.accessToken, data.refreshToken);

        return data;
      })
      .catch((err) => {
        dispatch({
          type: UserActionTypes.POST_LOGIN_FAILED,
        });
      })
      .finally(() => {
        dispatch({ type: UserActionTypes.AUTH_CHECKED });
      });
  };
}

// refresh.
export function refreshTokenThunk() {
  return function (dispatch: Dispatch<UserAction>) {
    dispatch({
      type: UserActionTypes.POST_REFRESH_TOKEN_REQUEST,
    });
    refreshTokenRequest()
      .then((data) => {
        dispatch({
          type: UserActionTypes.POST_REFRESH_TOKEN_SUCCESS,
          data: data,
        });

        saveTokens(data.accessToken, data.refreshToken);

        return data;
      })
      .catch((err) => {
        dispatch({
          type: UserActionTypes.POST_REFRESH_TOKEN_FAILED,
        });
      });
  };
}

// logout.
export function logoutThunk() {
  return function (dispatch: Dispatch<UserAction>) {
    dispatch({
      type: UserActionTypes.POST_LOGOUT_REQUEST,
    });
    logoutRequest()
      .then((data) => {
        localStorage.removeItem('refreshToken');

        dispatch({
          type: UserActionTypes.POST_LOGOUT_SUCCESS,
          data: data,
        });

        dispatch({
          type: UserActionTypes.RESET_STATE,
        });

        removeCookie('accessToken');

        return data;
      })
      .catch((err) => {
        dispatch({
          type: UserActionTypes.POST_LOGOUT_FAILED,
        });
      });
  };
}
