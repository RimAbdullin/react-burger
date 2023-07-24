import {
  IBurgerIngredientsConstructorState,
  IngredientsConstructorAction,
  IngredientsConstructorActionTypes,
} from '../store/types/ingredientsConstructor';

export const ingredientsConstructorInitialState = {
  ingredientsConstructor: [],
};

export const ingredientsConstructorReducer = (
  state: IBurgerIngredientsConstructorState = ingredientsConstructorInitialState,
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
        ingredientsConstructor:
          ingredientsConstructorInitialState.ingredientsConstructor,
      };
    }
    default: {
      return state;
    }
  }
};
