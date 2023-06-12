import {
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
} from '../actions/login';

const initialState = {
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
      return {
        ...state,
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
    default: {
      return state;
    }
  }
};
