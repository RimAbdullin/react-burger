import {
  ForgotPasswordAction,
  ForgotPasswordActionTypes,
  IForgotPasswordState,
} from '../store/types/forgot-password';

export const forgotInitialState: IForgotPasswordState = {
  isEmailSent: false,
  forgotPasswordRequest: true,
  forgotPasswordFailed: false,
};

export const forgotPasswordReducer = (
  state: IForgotPasswordState = forgotInitialState,
  action: ForgotPasswordAction
): IForgotPasswordState => {
  switch (action.type) {
    case ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      };
    }
    case ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
      };
    }
    case ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      };
    }
    case ForgotPasswordActionTypes.SET_FORGOT_PASSWORD: {
      return {
        ...state,
        isEmailSent: action.value,
      };
    }
    // reset all store.
    case ForgotPasswordActionTypes.RESET_STATE: {
      return {
        ...forgotInitialState,
        isEmailSent: state.isEmailSent,
      };
    }

    default: {
      return state;
    }
  }
};
