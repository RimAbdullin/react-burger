import {
  ADD_ITEM_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
} from '../actions/ingredientsConstructor';

const initialState = {
  ingredientsConstructor: [],
};

export const ingredientsConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_CONSTRUCTOR: {
      // Находим перетаскиваемый ингредиент.
      const filter = state.ingredients.filter(
        (item) => item._id === action.item.itemId
      )[0];

      // Если перетаскиваем ингредиенты с типом 'булка' то меняем верх и низ конструктора.
      if (filter.type === 'bun') {
        return {
          ...state,
          currentBun: {
            id: Date.now(),
            ...filter,
          },
          ingredients: [
            ...state.ingredients.map((item) => ({
              ...item,
              count:
                item.type === 'bun'
                  ? item._id === action.item.itemId
                    ? 1
                    : 0
                  : item.count,
            })),
          ],
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
    default: {
      return state;
    }
  }
};
