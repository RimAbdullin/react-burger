import { DECREASE_ITEM, INCREASE_ITEM, DELETE_ITEM } from '../actions/order';

const initialState = {
  number: 5,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
