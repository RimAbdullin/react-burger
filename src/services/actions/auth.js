import { userRegistration, userLogin } from '../../utils/burger-api';

export const POST_REGISTRATION_FAILED = 'POST_REGISTRATION_FAILED';
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_REQUEST = 'POST_REGISTRATION_REQUEST';

export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';

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
        console.log('=== registration data', data);
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTRATION_FAILED,
        });
      });
  };
}

export function loginUser(form) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });
    userLogin(form)
      .then((data) => {
        console.log('=== data login', data);
        dispatch({
          type: POST_LOGIN_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGIN_FAILED,
        });
      });
  };
}
