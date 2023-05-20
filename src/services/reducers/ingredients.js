import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  DECREASE_ITEM,
  INCREASE_ITEM,
  DELETE_ITEM,
} from '../actions/ingredients';

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false,
      };
    }
    case GET_ITEMS_SUCCESS: {
      console.log('=== action.items', action.items);
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
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
