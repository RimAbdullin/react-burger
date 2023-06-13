import {
  POST_REGISTRATION_FAILED,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_REQUEST,
  RESET_STATE,
} from '../actions/registration';

const initialState = {
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
        registrationRequest: false,
        registrationFailed: false,
      };
    }
    case POST_REGISTRATION_FAILED: {
      return { ...state, registrationFailed: true, registrationRequest: false };
    }

    // reset all store.
    case RESET_STATE: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};
