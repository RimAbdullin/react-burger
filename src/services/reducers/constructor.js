import {
  DECREASE_ITEM,
  INCREASE_ITEM,
  DELETE_ITEM,
} from '../actions/constructor';

const initialState = {
  items: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
