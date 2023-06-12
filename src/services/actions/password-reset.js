import { passwordReset } from '../../utils/burger-api';

export const POST_PASSWORD_RESET_FAILED = 'POST_PASSWORD_RESET_FAILED';
export const POST_PASSWORD_RESET_SUCCESS = 'POST_PASSWORD_RESET_SUCCESS';
export const POST_PASSWORD_RESET_REQUEST = 'POST_PASSWORD_RESET_REQUEST';

// thunk
export function passwordResetThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_PASSWORD_RESET_REQUEST,
    });
    passwordReset(form)
      .then((data) => {
        // Проверяем внутренний статус ответа.
        if (!data.success) {
          dispatch({
            type: POST_PASSWORD_RESET_FAILED,
          });
          return;
        }

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
