import {
  POST_FORGOT_PASSWORD_FAILED,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_RESET,
} from '../actions/forgot-password';

const initialState = {
  forgotPasswordRequest: true,
  forgotPasswordFailed: false,
  successForgotPassword: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        successForgotPassword: false,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      };
    }
    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        successForgotPassword: action.data.success,
      };
    }
    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        successForgotPassword: false,
      };
    }
    case FORGOT_PASSWORD_RESET: {
      return {
        ...state,
        successForgotPassword: false,
      };
    }
    default: {
      return state;
    }
  }
};
