import {
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
  SET_AUTH_STATUS,
  POST_REFRESH_TOKEN_FAILED,
  POST_REFRESH_TOKEN_SUCCESS,
  POST_REFRESH_TOKEN_REQUEST,
} from '../actions/auth';

const initialState = {
  user: { name: null, email: null },
  accessToken: null,
  refreshToken: null,
  loginRequest: true,
  loginFailed: false,
  isAuth: false,
  tokenRequest: true,
  tokenFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
        isAuth: action.data.success,
        user: {
          ...action.data.user,
          name: action.data.user.name,
          email: action.data.user.email,
        },
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    }
    case POST_LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case SET_AUTH_STATUS: {
      return {
        ...state,
        isAuth: action.value,
      };
    }

    case POST_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
        tokenFailed: false,
      };
    }
    case POST_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: false,
        isAuth: action.data.success,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    }
    case POST_REFRESH_TOKEN_FAILED: {
      return { ...state, tokenFailed: true, tokenRequest: false };
    }

    default: {
      return state;
    }
  }
};
