import {
  POST_LOGOUT_FAILED,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_REQUEST,
} from '../actions/logout';

const initialState = {
  logoutRequest: true,
  logoutFailed: false,
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
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
      };
    }
    case POST_LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
