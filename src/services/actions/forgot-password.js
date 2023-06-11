import { forgotPassword } from '../../utils/burger-api';

export const POST_FORGOT_PASSWORD_FAILED = 'POST_FORGOT_PASSWORD_FAILED';
export const POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS';
export const POST_FORGOT_PASSWORD_REQUEST = 'POST_FORGOT_PASSWORD_REQUEST';

export const FORGOT_PASSWORD_RESET = 'FORGOT_PASSWORD_RESET';

// thunk
export function forgotPasswordThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PASSWORD_REQUEST,
    });
    forgotPassword(form)
      .then((data) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_FAILED,
        });
      });
  };
}
