import {
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
} from '../actions/login';

const initialState = {
  name: null,
  email: null,
  accessToken: null,
  refreshToken: null,
  success: false,
  loginRequest: true,
  loginFailed: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case POST_LOGIN_SUCCESS: {
      console.log('=== action', action);
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        success: action.data.success,
        name: action.data.user.name,
        email: action.data.user.email,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    }
    case POST_LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    default: {
      return state;
    }
  }
};
