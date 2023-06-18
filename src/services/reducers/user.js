import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
  POST_REFRESH_TOKEN_FAILED,
  POST_REFRESH_TOKEN_SUCCESS,
  POST_REFRESH_TOKEN_REQUEST,
  POST_LOGOUT_FAILED,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_REQUEST,
  RESET_STATE,
  AUTH_CHECKED,
} from '../actions/user';

const initialState = {
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

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: { ...action.data.user },
      };
    }
    case GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        user: { ...action.data.user },
      };
    }
    case UPDATE_USER_FAILED: {
      return { ...state, updateUserFailed: true, updateUserRequest: false };
    }

    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }

    // login.
    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        user: { ...action.data.user },
      };
    }
    case POST_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }

    // refresh.
    case POST_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenFailed: false,
      };
    }
    case POST_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        refreshTokenRequest: false,
        refreshTokenFailed: false,
      };
    }
    case POST_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: true,
      };
    }

    // logout.
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        isAuthChecked: false,
        user: null,
      };
    }
    case POST_LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    // reset all store.
    case RESET_STATE: {
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
