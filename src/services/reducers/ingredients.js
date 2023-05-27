import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  SET_BUN,
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  bun: [],
  main: [],
  sauce: [],
  itemsRequest: false,
  itemsFailed: false,
  currentBun: null,
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
        ingredients: action.items.map((item) => ({ ...item, count: 0 })),
        bun: [...action.items.filter((bun) => bun.type == 'bun')],
        main: [...action.items.filter((bun) => bun.type == 'main')],
        sauce: [...action.items.filter((bun) => bun.type == 'sauce')],
        currentBun: {
          ...action.items.filter((item) => item.name === action.bunName)[0],
        },
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case SET_BUN: {
      return {
        ...state,
        currentBun: {
          id: Date.now(),
          ...state.bun.filter((item) => item.name === action.bunName)[0],
        },
        ingredients: [
          ...state.ingredients.map((item) => {
            if (item.name === action.bunName) {
              return { ...item, count: item.count + 1 };
            } else {
              return { ...item };
            }
          }),
        ],
      };
    }
    default: {
      return state;
    }
  }
};
