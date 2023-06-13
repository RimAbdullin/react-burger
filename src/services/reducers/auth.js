import {
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
} from '../actions/auth';

const initialState = {
  isAuth: false,
  user: { name: '', email: '' },
  caller: '',
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

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
        isAuth: true,
        loginRequest: false,
        loginFailed: false,
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
        isAuth: false,
        logoutRequest: false,
        logoutFailed: false,
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
        loginRequest: true,
        loginFailed: false,
        refreshTokenRequest: true,
        refreshTokenFailed: false,
        logoutRequest: true,
        logoutFailed: false,
      };
    }

    default: {
      return state;
    }
  }
};
