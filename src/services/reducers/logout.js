import {
  POST_LOGOUT_FAILED,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_REQUEST,
  LOGOUT_RESET,
} from '../actions/logout';

const initialState = {
  logoutRequest: true,
  logoutFailed: false,
  successLogout: false,
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
        successLogout: false,
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        successLogout: action.data.success,
        logoutRequest: false,
        logoutFailed: false,
      };
    }
    case POST_LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
        successLogout: false,
      };
    }
    case LOGOUT_RESET: {
      return {
        ...state,
        successLogout: false,
      };
    }
    default: {
      return state;
    }
  }
};
