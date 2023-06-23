import { SELECT_ITEM, CLEAR_ITEM } from '../actions/modal';

const initialState = {
  currentIngredient: null,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ITEM: {
      return {
        ...state,
        currentIngredient: action.item,
      };
    }
    case CLEAR_ITEM: {
      return {
        ...state,
        currentIngredient: null,
      };
    }

    default: {
      return state;
    }
  }
};
