import {
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
  SET_AUTH,
  SET_USER,
  POST_REFRESH_TOKEN_FAILED,
  POST_REFRESH_TOKEN_SUCCESS,
  POST_REFRESH_TOKEN_REQUEST,
  POST_LOGOUT_FAILED,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
} from '../actions/auth';

const initialState = {
  user: { name: null, email: null },
  loginRequest: true,
  loginFailed: false,
  isAuth: false,
  tokenRequest: true,
  tokenFailed: false,
  logoutRequest: true,
  logoutFailed: false,
  getUserRequest: true,
  getUserFailed: false,
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
        user: { ...action.data.user },
      };
    }
    case POST_LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }

    case SET_AUTH: {
      return {
        ...state,
        isAuth: action.value,
      };
    }

    case SET_USER: {
      return {
        ...state,
        user: { ...action.user },
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
      };
    }
    case POST_REFRESH_TOKEN_FAILED: {
      return { ...state, tokenFailed: true, tokenRequest: false };
    }

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
        isAuth: action.data.success,
        user: {},
      };
    }
    case POST_LOGOUT_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false, user: {} };
    }

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

    default: {
      return state;
    }
  }
};
