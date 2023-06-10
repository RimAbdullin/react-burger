import { userRegistration } from '../../utils/burger-api';

export const POST_REGISTRATION_FAILED = 'POST_REGISTRATION_FAILED';
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_REQUEST = 'POST_REGISTRATION_REQUEST';

// thunk
export function registrationUser(form) {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTRATION_REQUEST,
    });
    userRegistration(form)
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
