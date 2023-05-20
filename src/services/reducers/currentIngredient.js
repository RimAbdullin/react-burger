import {
  DECREASE_ITEM,
  INCREASE_ITEM,
  DELETE_ITEM,
} from '../actions/currentIngredient';

const initialState = {
  item: {},
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
