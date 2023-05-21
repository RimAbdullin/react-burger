import {
  GET_ITEM,
  DECREASE_ITEM,
  INCREASE_ITEM,
  DELETE_ITEM,
  SET_BUN,
} from '../actions/constructor';

const initialState = {
  currentBun: null,
  items: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM: {
      return { ...state };
    }
    case INCREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map((item) =>
          item.id === action.id ? { ...item, qty: ++item.qty } : item
        ),
      };
    }
    case DECREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map((item) =>
          item.id === action.id ? { ...item, qty: --item.qty } : item
        ),
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: [...state.items].filter((item) => item.id !== action.id),
      };
    }
    case SET_BUN: {
      console.log(SET_BUN);
      console.log('=== action.currentBun', action.currentBun);
      console.log(state);
      return {
        ...state,
        currentBun: action.currentBun,
        // items: [],
      };
    }
    default: {
      return state;
    }
  }
};
