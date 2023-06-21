import { forgotPasswordRequest } from '../../utils/burger-api';

export const POST_FORGOT_PASSWORD_FAILED = 'POST_FORGOT_PASSWORD_FAILED';
export const POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS';
export const POST_FORGOT_PASSWORD_REQUEST = 'POST_FORGOT_PASSWORD_REQUEST';

export const RESET_STATE = 'RESET_STATE';

export const SET_FORGOT_PASSWORD = 'SET_FORGOT_PASSWORD';

// thunk
export function forgotPasswordThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PASSWORD_REQUEST,
    });
    forgotPasswordRequest(form)
      .then((data) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          data: data,
        });

        dispatch({
          type: SET_FORGOT_PASSWORD,
          value: true,
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
