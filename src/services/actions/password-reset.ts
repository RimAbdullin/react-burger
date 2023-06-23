import { Dispatch } from 'react';
import { passwordResetRequest } from '../../utils/burger-api';
import {
  IPasswordResetForm,
  PasswordResetAction,
  PasswordResetActionTypes,
} from '../store/types/password-reset';

// thunk
export function passwordResetThunk(form: IPasswordResetForm) {
  return function (dispatch: Dispatch<PasswordResetAction>) {
    dispatch({
      type: PasswordResetActionTypes.POST_PASSWORD_RESET_REQUEST,
    });
    passwordResetRequest(form)
      .then((data) => {
        dispatch({
          type: PasswordResetActionTypes.POST_PASSWORD_RESET_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: PasswordResetActionTypes.POST_PASSWORD_RESET_FAILED,
        });
      });
  };
}
