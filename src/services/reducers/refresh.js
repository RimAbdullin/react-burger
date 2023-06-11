import {
  POST_REFRESH_TOKEN_FAILED,
  POST_REFRESH_TOKEN_SUCCESS,
  POST_REFRESH_TOKEN_REQUEST,
  REFRESH_RESET,
} from '../actions/refresh';

const initialState = {
  tokenRequest: true,
  tokenFailed: false,
  successRefresh: false,
};

export const refreshReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        successRefresh: false,
        tokenRequest: true,
        tokenFailed: false,
      };
    }
    case POST_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        successRefresh: action.data.success,
        tokenRequest: false,
        tokenFailed: false,
      };
    }
    case POST_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        tokenRequest: false,
        successRefresh: false,
      };
    }
    case REFRESH_RESET: {
      return {
        ...state,
        successRefresh: false,
      };
    }
    default: {
      return state;
    }
  }
};
