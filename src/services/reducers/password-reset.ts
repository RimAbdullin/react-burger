import {
  IPasswordResetState,
  PasswordResetAction,
  PasswordResetActionTypes,
} from '../store/types/password-reset';

export const passwordInitialState = {
  passwordResetRequest: true,
  passwordResetFailed: false,
};

export const passwordResetReducer = (
  state: IPasswordResetState = passwordInitialState,
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
        ...passwordInitialState,
      };
    }

    default: {
      return state;
    }
  }
};
