import { registration } from '../../utils/burger-api';

export const POST_REGISTRATION_FAILED = 'POST_REGISTRATION_FAILED';
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_REQUEST = 'POST_REGISTRATION_REQUEST';

export const RESET_STATE = 'RESET_STATE';

// thunk
export function registrationThunk(form) {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTRATION_REQUEST,
    });
    registration(form)
      .then((data) => {
        dispatch({
          type: POST_REGISTRATION_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTRATION_FAILED,
        });
      });
  };
}
