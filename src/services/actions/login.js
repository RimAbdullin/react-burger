import { login } from '../../utils/burger-api';

export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';

export const LOGIN_RESET = 'LOGIN_RESET';

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

        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGIN_FAILED,
        });
      });
  };
}