import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  SET_AUTH,
  SET_USER,
} from '../actions/user';

const initialState = {
  user: { name: '', email: '' },
  isAuth: false,
  getUserRequest: true,
  getUserFailed: false,
  updateUserRequest: true,
  updateUserFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        isAuth: action.value,
      };
    }

    case SET_USER: {
      return {
        ...state,
        user: { ...action.user },
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: { ...action.data.user },
      };
    }
    case GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        user: { ...action.data.user },
      };
    }
    case UPDATE_USER_FAILED: {
      return { ...state, updateUserFailed: true, updateUserRequest: false };
    }

    default: {
      return state;
    }
  }
};
