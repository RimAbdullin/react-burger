import { Dispatch } from 'react';
import { registrationRequest } from '../../utils/burger-api';
import { saveTokens } from '../common/common';
import {
  IRegistrationForm,
  RegistrationAction,
  RegistrationActionTypes,
} from '../store/types/registration';

// thunk
export function registrationThunk(form: IRegistrationForm) {
  return function (dispatch: Dispatch<RegistrationAction>) {
    dispatch({
      type: RegistrationActionTypes.POST_REGISTRATION_REQUEST,
    });
    registrationRequest(form)
      .then((data) => {
        dispatch({
          type: RegistrationActionTypes.POST_REGISTRATION_SUCCESS,
          data: data,
        });
        saveTokens(data.accessToken, data.refreshToken);
        return data;
      })
      .catch((err) => {
        dispatch({
          type: RegistrationActionTypes.POST_REGISTRATION_FAILED,
        });
      });
  };
}
