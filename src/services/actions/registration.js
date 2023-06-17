import { registrationRequest } from '../../utils/burger-api';
import { saveTokens } from '../common/common';

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
    registrationRequest(form)
      .then((data) => {
        dispatch({
          type: POST_REGISTRATION_SUCCESS,
          data: data,
        });
        saveTokens(data.accessToken, data.refreshToken);
        return data;
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTRATION_FAILED,
        });
      });
  };
}
