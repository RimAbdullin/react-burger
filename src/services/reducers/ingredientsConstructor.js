import {
  ADD_ITEM_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
  CLEAR_INGREDIENTS_CONSTRUCTOR,
} from '../actions/ingredientsConstructor';

const initialState = {
  ingredientsConstructor: [],
};

export const ingredientsConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [
          ...state.ingredientsConstructor,
          {
            ...action.item,
            id: action.item.id,
            count: action.item.count + 1,
          },
        ],
      };
    }
    case DELETE_ITEM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter(
          (item) => item.id !== action.item.id
        ),
      };
    }
    case CLEAR_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: initialState.ingredientsConstructor,
      };
    }
    default: {
      return state;
    }
  }
};
