import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from '../actions/ingredients';

const initialState = {
  bun: [],
  main: [],
  sauce: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        bun: action.items.filter((bun) => bun.type == 'bun'),
        main: action.items.filter((bun) => bun.type == 'main'),
        sauce: action.items.filter((bun) => bun.type == 'sauce'),
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
};
