import { SET_AUTH } from '../actions/auth';

const initialState = {
  isAuth: false,
  caller: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        isAuth: action.value,
        caller: action.caller,
      };
    }
    default: {
      return state;
    }
  }
};
