import {
  POST_FORGOT_PASSWORD_FAILED,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_REQUEST,
  RESET_STATE,
  SET_FORGOT_PASSWORD,
} from '../actions/forgot-password';

const initialState = {
  isEmailSent: false,
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
    case SET_FORGOT_PASSWORD: {
      return {
        ...state,
        isEmailSent: action.value,
      };
    }
    // reset all store.
    case RESET_STATE: {
      return {
        ...initialState,
        isEmailSent: state.isEmailSent,
      };
    }

    default: {
      return state;
    }
  }
};
