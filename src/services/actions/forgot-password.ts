import { Dispatch } from 'react';
import { forgotPasswordRequest } from '../../utils/burger-api';
import {
  ForgotPasswordAction,
  ForgotPasswordActionTypes,
  IForgotPasswordForm,
} from '../store/types/forgot-password';

// thunk
export function forgotPasswordThunk(form: IForgotPasswordForm) {
  return function (dispatch: Dispatch<ForgotPasswordAction>) {
    dispatch({
      type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_REQUEST,
    });
    forgotPasswordRequest(form)
      .then((data) => {
        dispatch({
          type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_SUCCESS,
          data: data,
        });

        dispatch({
          type: ForgotPasswordActionTypes.SET_FORGOT_PASSWORD,
          value: true,
        });

        return data;
      })
      .catch((err) => {
        dispatch({
          type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_FAILED,
        });
      });
  };
}
