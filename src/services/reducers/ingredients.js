import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  SET_BUN,
  ADD_ITEM,
  DELETE_ITEM,
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  bun: [],
  main: [],
  sauce: [],
  itemsRequest: false,
  itemsFailed: false,
  ingredientsConstructor: [],
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
        ingredients: [...action.items],
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
          ...state.bun.filter((item) => item.name === action.bunName)[0],
        },
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor, action.item],
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter(
          (item) => item.id !== action.item.id
        ),
      };
    }
    default: {
      return state;
    }
  }
};
