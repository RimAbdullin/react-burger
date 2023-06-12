import { logout } from '../../utils/burger-api';

export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';

export const RESET_STATE = 'RESET_STATE';

// thunk
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
