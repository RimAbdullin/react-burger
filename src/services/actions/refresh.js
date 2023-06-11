import { refresh } from '../../utils/burger-api';

export const POST_REFRESH_TOKEN_FAILED = 'POST_REFRESH_TOKEN_FAILED';
export const POST_REFRESH_TOKEN_SUCCESS = 'POST_REFRESH_TOKEN_SUCCESS';
export const POST_REFRESH_TOKEN_REQUEST = 'POST_REFRESH_TOKEN_REQUEST';

export const REFRESH_RESET = 'REFRESH_RESET';

// thunk
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