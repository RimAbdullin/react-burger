import { login, refresh, logout } from '../../utils/burger-api';

export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';

export const POST_REFRESH_TOKEN_FAILED = 'POST_REFRESH_TOKEN_FAILED';
export const POST_REFRESH_TOKEN_SUCCESS = 'POST_REFRESH_TOKEN_SUCCESS';
export const POST_REFRESH_TOKEN_REQUEST = 'POST_REFRESH_TOKEN_REQUEST';

export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';

export const RESET_STATE = 'RESET_STATE';

// thunk
// login.
export function loginThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });
    login(form)
      .then((data) => {
        // Проверяем внутренний статус ответа.
        if (!data.success) {
          dispatch({
            type: POST_LOGIN_FAILED,
          });
          return;
        }

        dispatch({
          type: POST_LOGIN_SUCCESS,
          data: data,
        });

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGIN_FAILED,
        });
      });
  };
}

// refresh.
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
export function logoutThunk(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });
    logout(refreshToken)
      .then((data) => {
        // Проверяем внутренний статус ответа.
        if (!data.success) {
          dispatch({
            type: POST_LOGOUT_FAILED,
          });
          return;
        }

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        dispatch({
          type: POST_LOGOUT_SUCCESS,
          data: data,
        });

        dispatch({
          type: RESET_STATE,
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
