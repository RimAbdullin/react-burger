import {
  IPasswordResetState,
  PasswordResetAction,
  PasswordResetActionTypes,
} from '../store/types/password-reset';

const initialState = {
  passwordResetRequest: true,
  passwordResetFailed: false,
};

export const passwordResetReducer = (
  state: IPasswordResetState = initialState,
  action: PasswordResetAction
): IPasswordResetState => {
  switch (action.type) {
    case PasswordResetActionTypes.POST_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetFailed: false,
      };
    }
    case PasswordResetActionTypes.POST_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: false,
      };
    }
    case PasswordResetActionTypes.POST_PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetFailed: true,
        passwordResetRequest: false,
      };
    }

    // reset all store.
    case PasswordResetActionTypes.RESET_STATE: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};
