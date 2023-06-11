import { logout } from '../../utils/burger-api';

export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';

export const LOGOUT_RESET = 'LOGOUT_RESET';

// thunk
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

        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGOUT_FAILED,
        });
      });
  };
}
