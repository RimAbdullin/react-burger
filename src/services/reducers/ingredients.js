import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  SET_BUN,
  ADD_ITEM_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
  SELECT_ITEM,
  CLEAR_ITEM,
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  currentIngredient: null,
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
    case ADD_ITEM_CONSTRUCTOR: {
      // Находим перетаскиваемый ингредиент.
      const filter = state.ingredients.filter(
        (item) => item._id === action.item.itemId
      )[0];

      // Если перетаскиваем ингредиенты с типом 'булка' то меняем верх и низ конструктора.
      if (filter.type === 'bun') {
        const test = [
          ...state.ingredients.map((item) => ({
            ...item,
            count:
              item._id === action.item.itemId && item.type === 'bun' ? 1 : 0,
          })),
        ];

        console.log('=== test', test);

        return {
          ...state,
          currentBun: {
            id: Date.now(),
            ...filter,
          },
          ingredients: [...test],
        };
      } else {
        // Если перетаскиваем ингредиенты с типом не 'булка' то добавляем в список конструктора.
        return {
          ...state,
          ingredientsConstructor: [
            ...state.ingredientsConstructor,
            { ...filter, id: action.item.id, count: filter.count + 1 },
          ],
          ingredients: [
            ...state.ingredients.map((item) => {
              if (item._id === action.item.itemId) {
                return { ...item, count: item.count + 1 };
              } else {
                return { ...item };
              }
            }),
          ],
        };
      }
    }
    case DELETE_ITEM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter(
          (item) => item.id !== action.item.id
        ),
        ingredients: [
          ...state.ingredients.map((item) => {
            if (item._id === action.item._id) {
              return { ...item, count: item.count - 1 };
            } else {
              return { ...item };
            }
          }),
        ],
      };
    }

    case SELECT_ITEM: {
      return {
        ...state,
        currentIngredient: action.item,
      };
    }
    case CLEAR_ITEM: {
      return {
        ...state,
        currentIngredient: null,
      };
    }

    default: {
      return state;
    }
  }
};
