import { SET_BUN } from '../actions/cartIngredients';

const initialState = {
  currentBun: {},
  itemsCartIngredients: [],
};

export const cartIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        currentBun: {
          ...action.bun.filter((item) => item.name === action.bunName)[0],
        },
      };
    }
    default: {
      return state;
    }
  }
};
