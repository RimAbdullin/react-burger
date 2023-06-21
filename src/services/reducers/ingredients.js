import {
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
  SET_BUN,
  INCREASE_ITEM,
  DECREASE_ITEM,
  GET_ITEM,
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  bun: [],
  main: [],
  sauce: [],
  itemsRequest: false,
  itemsFailed: false,
  currentBun: null,
  currentIngredient: {},
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
          id: action.id,
          ...state.bun.filter((item) => item.name === action.bunName)[0],
        },
        ingredients: [
          ...state.ingredients.map((item) => ({
            ...item,
            count:
              item.type === 'bun'
                ? item.name === action.bunName
                  ? 1
                  : 0
                : item.count,
          })),
        ],
      };
    }
    case INCREASE_ITEM: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((item) => ({
            ...item,
            count: item._id === action.itemId ? item.count + 1 : item.count,
          })),
        ],
      };
    }

    case DECREASE_ITEM: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((item) => ({
            ...item,
            count: item._id === action.itemId ? item.count - 1 : item.count,
          })),
        ],
      };
    }

    case GET_ITEM: {
      return {
        ...state,
        currentIngredient: {
          ...state.ingredients.filter((item) => item._id === action.id)[0],
        },
      };
    }

    default: {
      return state;
    }
  }
};
