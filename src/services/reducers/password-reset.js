import {
  POST_PASSWORD_RESET_FAILED,
  POST_PASSWORD_RESET_SUCCESS,
  POST_PASSWORD_RESET_REQUEST,
} from '../actions/password-reset';

const initialState = {
  passwordResetRequest: true,
  passwordResetFailed: false,
};

export const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetFailed: false,
      };
    }
    case POST_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: false,
      };
    }
    case POST_PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetFailed: true,
        passwordResetRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
