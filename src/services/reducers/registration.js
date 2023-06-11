import {
  POST_REGISTRATION_FAILED,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_REQUEST,
} from '../actions/registration';

const initialState = {
  success: false,
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
        success: action.data.success,
        registrationRequest: false,
        registrationFailed: false,
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
