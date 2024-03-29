import {
  IngredientsActionTypes,
  IBurgerIngredientsState,
  IngredientsAction,
} from '../store/types/ingredients';

export const ingredientsInitialState: IBurgerIngredientsState = {
  ingredients: [],
  bun: [],
  main: [],
  sauce: [],
  itemsRequest: false,
  itemsFailed: false,
  currentBun: null,
  currentIngredient: null,
};

export const ingredientsReducer = (
  state: IBurgerIngredientsState = ingredientsInitialState,
  action: IngredientsAction
): IBurgerIngredientsState => {
  switch (action.type) {
    case IngredientsActionTypes.GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false,
      };
    }
    case IngredientsActionTypes.GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        ingredients: action.items.map((item) => item),
        bun: [...action.items.filter((bun) => bun.type == 'bun')],
        main: [...action.items.filter((bun) => bun.type == 'main')],
        sauce: [...action.items.filter((bun) => bun.type == 'sauce')],
      };
    }
    case IngredientsActionTypes.GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case IngredientsActionTypes.SET_BUN: {
      return {
        ...state,
        currentBun: {
          ...state.ingredients.filter(
            (item) => item.name === action.bunName
          )[0],
        },
      };
    }

    case IngredientsActionTypes.GET_ITEM: {
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
