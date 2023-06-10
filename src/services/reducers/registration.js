import {
  POST_REGISTRATION_FAILED,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_REQUEST,
} from '../actions/registration';

const initialState = {
  user: { name: null, email: null },
  accessToken: null,
  refreshToken: null,
  isSuccess: false,
  registrationRequest: true,
  registrationFailed: false,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      };
    }
    case POST_REGISTRATION_SUCCESS: {
      return {
        ...state,
        isSuccess: action.data.success,
        registrationRequest: false,
        registrationFailed: false,
        user: {
          ...action.data.user,
          name: action.data.user.name,
          email: action.data.user.email,
        },
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    }
    case POST_REGISTRATION_FAILED: {
      return { ...state, registrationFailed: true, registrationRequest: false };
    }
    default: {
      return state;
    }
  }
};
