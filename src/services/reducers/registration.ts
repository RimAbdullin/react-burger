import {
  RegistrationAction,
  RegistrationActionTypes,
} from '../store/types/registration';

export const registrationInitialState = {
  registrationRequest: true,
  registrationFailed: false,
};

export const registrationReducer = (
  state = registrationInitialState,
  action: RegistrationAction
) => {
  switch (action.type) {
    case RegistrationActionTypes.POST_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      };
    }
    case RegistrationActionTypes.POST_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
      };
    }
    case RegistrationActionTypes.POST_REGISTRATION_FAILED: {
      return { ...state, registrationFailed: true, registrationRequest: false };
    }

    // reset all store.
    case RegistrationActionTypes.RESET_STATE: {
      return {
        ...registrationInitialState,
      };
    }

    default: {
      return state;
    }
  }
};
