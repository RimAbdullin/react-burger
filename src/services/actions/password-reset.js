import { passwordReset } from '../../utils/burger-api';

export const POST_PASSWORD_RESET_FAILED = 'POST_PASSWORD_RESET_FAILED';
export const POST_PASSWORD_RESET_SUCCESS = 'POST_PASSWORD_RESET_SUCCESS';
export const POST_PASSWORD_RESET_REQUEST = 'POST_PASSWORD_RESET_REQUEST';

export const PASSWORD_RESET_RESET = 'PASSWORD_RESET_RESET';

// thunk
export function passwordResetThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_PASSWORD_RESET_REQUEST,
    });
    passwordReset(form)
      .then((data) => {
        dispatch({
          type: POST_PASSWORD_RESET_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_PASSWORD_RESET_FAILED,
        });
      });
  };
}
