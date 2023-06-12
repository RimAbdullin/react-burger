import {
  POST_REFRESH_TOKEN_FAILED,
  POST_REFRESH_TOKEN_SUCCESS,
  POST_REFRESH_TOKEN_REQUEST,
} from '../actions/refresh';

const initialState = {
  refreshTokenRequest: true,
  refreshTokenFailed: false,
};

export const refreshReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
