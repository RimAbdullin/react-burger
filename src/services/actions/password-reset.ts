import { passwordResetRequest } from '../../utils/burger-api';
import {
  IPasswordResetForm,
  PasswordResetActionTypes,
} from '../store/types/password-reset';
import { AppDispatch } from '../store/store';

// thunk
export function passwordResetThunk(form: IPasswordResetForm) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: PasswordResetActionTypes.POST_PASSWORD_RESET_REQUEST,
    });
    return passwordResetRequest(form)
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
