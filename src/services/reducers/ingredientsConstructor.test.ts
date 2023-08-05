import {
  ingredientsConstructorInitialState,
  ingredientsConstructorReducer as reducer,
} from './ingredientsConstructor';
import * as types from '../store/types/ingredientsConstructor';
import { IBurgerIngredient } from '../common/interfaces';

describe('ingredients reducer', () => {
  const item = {
    _id: '60666c42cc7b410027a1a9bc',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
    __v: 0,
  };

  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual(
      ingredientsConstructorInitialState
    );
  });

  it('ADD_ITEM_CONSTRUCTOR', () => {
    expect(
      reducer(
        {
          ingredientsConstructor: [],
        } as types.IBurgerIngredientsConstructorState,
        {
          type: types.IngredientsConstructorActionTypes.ADD_ITEM_CONSTRUCTOR,
          item: item,
        }
      )
    ).toEqual({
      ingredientsConstructor: [item],
    });
  });

  it('CLEAR_INGREDIENTS_CONSTRUCTOR', () => {
    expect(
      reducer(
        {
          ingredientsConstructor: [item],
        } as types.IBurgerIngredientsConstructorState,
        {
          type: types.IngredientsConstructorActionTypes
            .CLEAR_INGREDIENTS_CONSTRUCTOR,
        }
      )
    ).toEqual({
      ingredientsConstructor: [],
    });
  });

  it('DELETE_ITEM_CONSTRUCTOR', () => {
    expect(
      reducer(
        {
          ingredientsConstructor: [item],
        } as types.IBurgerIngredientsConstructorState,
        {
          type: types.IngredientsConstructorActionTypes.DELETE_ITEM_CONSTRUCTOR,
          item: {} as IBurgerIngredient,
        }
      )
    ).toEqual({
      ingredientsConstructor: [],
    });
  });
});
