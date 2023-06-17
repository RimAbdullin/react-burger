import { passwordResetRequest } from '../../utils/burger-api';

export const POST_PASSWORD_RESET_FAILED = 'POST_PASSWORD_RESET_FAILED';
export const POST_PASSWORD_RESET_SUCCESS = 'POST_PASSWORD_RESET_SUCCESS';
export const POST_PASSWORD_RESET_REQUEST = 'POST_PASSWORD_RESET_REQUEST';

export const RESET_STATE = 'RESET_STATE';

// thunk
export function passwordResetThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_PASSWORD_RESET_REQUEST,
    });
    passwordResetRequest(form)
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
