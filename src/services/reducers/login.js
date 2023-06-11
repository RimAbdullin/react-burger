import {
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
  LOGIN_RESET,
} from '../actions/login';

const initialState = {
  loginRequest: true,
  loginFailed: false,
  successLogin: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        successLogin: false,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        successLogin: action.data.success,
      };
    }
    case POST_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        successLogin: false,
      };
    }
    case LOGIN_RESET: {
      return {
        ...state,
        successLogin: false,
      };
    }
    default: {
      return state;
    }
  }
};
