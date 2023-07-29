import {
  ingredientsInitialState,
  ingredientsReducer as reducer,
} from './ingredients';
import * as types from '../store/types/ingredients';
import { IBurgerIngredient } from '../common/interfaces';
import { ingredientsData } from '../../utils/ingredients-data';

describe('ingredients reducer', () => {
  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual(ingredientsInitialState);
  });

  it('GET_ITEMS_REQUEST', () => {
    expect(
      reducer({} as types.IBurgerIngredientsState, {
        type: types.IngredientsActionTypes.GET_ITEMS_REQUEST,
      })
    ).toEqual({
      itemsRequest: true,
      itemsFailed: false,
    });
  });

  it('GET_ITEMS_SUCCESS', () => {
    expect(
      reducer({} as types.IBurgerIngredientsState, {
        type: types.IngredientsActionTypes.GET_ITEMS_SUCCESS,
        items: [] as IBurgerIngredient[],
        bunName: '',
      })
    ).toEqual({
      itemsRequest: false,
      itemsFailed: false,
      ingredients: [],
      bun: [],
      main: [],
      sauce: [],
    });
  });

  it('GET_ITEMS_FAILED', () => {
    expect(
      reducer({} as types.IBurgerIngredientsState, {
        type: types.IngredientsActionTypes.GET_ITEMS_FAILED,
      })
    ).toEqual({
      itemsFailed: true,
      itemsRequest: false,
    });
  });

  it('GET_ITEM', () => {
    expect(
      reducer(
        {
          ...ingredientsInitialState,
          ingredients: ingredientsData,
        } as types.IBurgerIngredientsState,
        {
          type: types.IngredientsActionTypes.GET_ITEM,
          id: '60666c42cc7b410027a1a9bc',
        }
      )
    ).toEqual({
      ...ingredientsInitialState,
      ingredients: ingredientsData,
      currentIngredient: {
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
      },
    });
  });

  it('SET_BUN', () => {
    expect(
      reducer(
        {
          ...ingredientsInitialState,
          ingredients: ingredientsData,
        } as types.IBurgerIngredientsState,
        {
          type: types.IngredientsActionTypes.SET_BUN,
          bunName: 'Краторная булка N-200i',
        }
      )
    ).toEqual({
      ...ingredientsInitialState,
      ingredients: ingredientsData,
      currentBun: {
        _id: '60666c42cc7b410027a1a9b1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      },
    });
  });
});
