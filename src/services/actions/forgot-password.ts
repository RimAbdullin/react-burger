import { forgotPasswordRequest } from '../../utils/burger-api';
import {
  ForgotPasswordActionTypes,
  IForgotPasswordForm,
} from '../store/types/forgot-password';
import { AppDispatch } from '../store/store';

// thunk
export function forgotPasswordThunk(form: IForgotPasswordForm) {
  return function (dispatch: AppDispatch) {
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
