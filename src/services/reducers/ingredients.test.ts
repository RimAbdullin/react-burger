import configureMockStore from 'redux-mock-store';
import {
  ingredientsInitialState,
  ingredientsReducer as reducer,
} from './ingredients';
import * as types from '../store/types/ingredients';
import { IBurgerIngredient } from '../common/interfaces';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/IngredientDetails';
import { ingredientsData } from '../../utils/ingredients-data';

const middlewares: any = [];
const mockStore = configureMockStore(middlewares);

describe('ingredients reducer', () => {
  // Инициализируем хранилище mockStore с пустым state.
  const initialState = ingredientsInitialState;
  const store = mockStore(initialState);

  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      ingredients: [],
      bun: [],
      main: [],
      sauce: [],
      itemsRequest: false,
      itemsFailed: false,
      currentBun: null,
      currentIngredient: null,
    });
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

  // it('DECREASE_ITEM', () => {
  //   expect(
  //     reducer({} as types.IBurgerIngredientsState, {
  //       type: types.IngredientsActionTypes.DECREASE_ITEM,
  //       itemId: '',
  //     })
  //   ).toEqual({
  //     ingredients: [] as IBurgerIngredient[],
  //   });
  // });

  it('INCREASE_ITEM', () => {
    const increaseItem = () => ({
      type: types.IngredientsActionTypes.INCREASE_ITEM,
      itemId: '60666c42cc7b410027a1a9b1',
    });

    store.dispatch(increaseItem());

    const actions = store.getActions();

    const expected = {
      type: types.IngredientsActionTypes.INCREASE_ITEM,
      itemId: '60666c42cc7b410027a1a9b1',
    };

    expect(actions).toEqual([expected]);

    const test: IBurgerIngredient[] = [...ingredientsData];

    expect(
      reducer(
        { ...initialState, ingredients: ingredientsData },
        {
          type: types.IngredientsActionTypes.INCREASE_ITEM,
          itemId: '60666c42cc7b410027a1a9b5',
        }
      )
    ).toEqual({
      itemsRequest: false,
      itemsFailed: false,
      ingredients: [
        ...ingredientsData.map((item) => ({
          ...item,
          count:
            item._id === '60666c42cc7b410027a1a9b5'
              ? item.count
                ? item.count
                : 0 + 1
              : item.count,
        })),
      ],
      bun: [],
      main: [],
      sauce: [],
      currentBun: null,
      currentIngredient: null,
    });
  });

  // it('GET_ITEM', () => {
  //   expect(
  //     reducer({} as types.IBurgerIngredientsState, {
  //       type: types.IngredientsActionTypes.GET_ITEM,
  //       id: '',
  //     })
  //   ).toEqual({ currentIngredient: {} });
  // });

  // it('SET_BUN', () => {
  //   expect(
  //     reducer({} as types.IBurgerIngredientsState, {
  //       type: types.IngredientsActionTypes.SET_BUN,
  //       bunName: '',
  //       id: '',
  //     })
  //   ).toEqual({
  //     forgotPasswordRequest: true,
  //     forgotPasswordFailed: false,
  //   });
  // });
});
