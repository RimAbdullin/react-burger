import {
  POST_FORGOT_PASSWORD_FAILED,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_REQUEST,
} from '../actions/forgot-password';

const initialState = {
  forgotPasswordRequest: true,
  forgotPasswordFailed: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      };
    }
    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
      };
    }
    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
