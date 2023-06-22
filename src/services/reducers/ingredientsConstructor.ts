// import {
//   ADD_ITEM_CONSTRUCTOR,
//   DELETE_ITEM_CONSTRUCTOR,
//   CLEAR_INGREDIENTS_CONSTRUCTOR,
// } from '../actions/ingredientsConstructor';
import {
  IBurgerIngredientsConstructorState,
  IngredientsConstructorAction,
  IngredientsConstructorActionTypes,
} from '../store/types/ingredientsConstructor';

const initialState = {
  ingredientsConstructor: [],
};

export const ingredientsConstructorReducer = (
  state: IBurgerIngredientsConstructorState = initialState,
  action: IngredientsConstructorAction
) => {
  switch (action.type) {
    case IngredientsConstructorActionTypes.ADD_ITEM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [
          ...state.ingredientsConstructor,
          {
            ...action.item,
            id: action.item.id,
            count: action.item.count ? action.item.count : 0 + 1,
          },
        ],
      };
    }
    case IngredientsConstructorActionTypes.DELETE_ITEM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter(
          (item) => item.id !== action.item.id
        ),
      };
    }
    case IngredientsConstructorActionTypes.CLEAR_INGREDIENTS_CONSTRUCTOR: {
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
