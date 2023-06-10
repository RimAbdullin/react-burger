import { refreshToken, userLogin } from '../../utils/burger-api';

export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';

export const POST_REFRESH_TOKEN_FAILED = 'POST_REFRESH_TOKEN_FAILED';
export const POST_REFRESH_TOKEN_SUCCESS = 'POST_REFRESH_TOKEN_SUCCESS';
export const POST_REFRESH_TOKEN_REQUEST = 'POST_REFRESH_TOKEN_REQUEST';

export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';

// thunk
export function loginUser(form) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });
    userLogin(form)
      .then((data) => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          data: data,
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

export function refreshTokenThunk(token) {
  return function (dispatch) {
    dispatch({
      type: POST_REFRESH_TOKEN_REQUEST,
    });
    refreshToken(token)
      .then((data) => {
        dispatch({
          type: POST_REFRESH_TOKEN_SUCCESS,
          data: data,
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
