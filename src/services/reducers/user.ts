import { IUserState, UserAction, UserActionTypes } from '../store/types/user';

export const userInitialState = {
  isAuthChecked: false,
  user: null,
  // getUser.
  getUserRequest: true,
  getUserFailed: false,
  // updateUser.
  updateUserRequest: true,
  updateUserFailed: false,
  // login.
  loginRequest: true,
  loginFailed: false,
  // refresh.
  refreshTokenRequest: true,
  refreshTokenFailed: false,
  // logout.
  logoutRequest: true,
  logoutFailed: false,
};

export const userReducer = (
  state: IUserState = userInitialState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case UserActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: { ...action.data.user },
      };
    }
    case UserActionTypes.GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }

    case UserActionTypes.UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UserActionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        user: { ...action.data.user },
      };
    }
    case UserActionTypes.UPDATE_USER_FAILED: {
      return { ...state, updateUserFailed: true, updateUserRequest: false };
    }

    case UserActionTypes.AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }

    // login.
    case UserActionTypes.POST_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case UserActionTypes.POST_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        user: { ...action.data.user },
      };
    }
    case UserActionTypes.POST_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }

    // refresh.
    case UserActionTypes.POST_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenFailed: false,
      };
    }
    case UserActionTypes.POST_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: false,
      };
    }
    case UserActionTypes.POST_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: true,
      };
    }

    // logout.
    case UserActionTypes.POST_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case UserActionTypes.POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        isAuthChecked: false,
        user: null,
      };
    }
    case UserActionTypes.POST_LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    // reset all store.
    case UserActionTypes.RESET_STATE: {
      return {
        ...state,
        isAuthChecked: state.isAuthChecked,
        getUserRequest: true,
        getUserFailed: false,
        // updateUser.
        updateUserRequest: true,
        updateUserFailed: false,
        // login.
        loginRequest: true,
        loginFailed: false,
        // refresh.
        refreshTokenRequest: true,
        refreshTokenFailed: false,
        // logout.
        logoutRequest: true,
        logoutFailed: false,
      };
    }

    default: {
      return state;
    }
  }
};
