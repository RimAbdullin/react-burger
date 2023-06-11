import {
  POST_PASSWORD_RESET_FAILED,
  POST_PASSWORD_RESET_SUCCESS,
  POST_PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_RESET,
} from '../actions/password-reset';

const initialState = {
  passwordResetRequest: true,
  passwordResetFailed: false,
  successPasswordReset: false,
};

export const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        successPasswordReset: false,
        passwordResetRequest: true,
        passwordResetFailed: false,
      };
    }
    case POST_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: false,
        successPasswordReset: action.data.success,
      };
    }
    case POST_PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetFailed: true,
        passwordResetRequest: false,
        successPasswordReset: false,
      };
    }
    case PASSWORD_RESET_RESET: {
      return {
        ...state,
        successPasswordReset: false,
      };
    }
    default: {
      return state;
    }
  }
};
