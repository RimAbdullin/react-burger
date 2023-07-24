import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getIngredientsItemsThunk as actions } from './ingredients';
import { IngredientsActionTypes } from '../store/types/ingredients';
import fetchMock from 'fetch-mock';
import { NORMA_API } from '../../data/data';
import { IBurgerIngredient } from '../common/interfaces';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Проверка асинхронного thunk для Ingredients', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Тестирование успешного запроса', async () => {
    const expectedActions = [
      { type: IngredientsActionTypes.GET_ITEMS_REQUEST },
      {
        type: IngredientsActionTypes.GET_ITEMS_SUCCESS,
        items: [] as IBurgerIngredient[],
        bunName: '',
      },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.get(
      // request options.
      {
        url: `${NORMA_API}/ingredients`,
      },

      // response.
      {
        data: [],
        success: true,
      }
    );

    // Проверка actions.
    return store.dispatch(actions('') as any).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
