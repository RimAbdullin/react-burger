import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getOrderNumberThunk as actions } from './order';
import { OrderActionTypes } from '../store/types/order';
import fetchMock from 'fetch-mock';
import { NORMA_API } from '../../data/data';
import { getCookie } from '../common/common';
import { IngredientsConstructorActionTypes } from '../store/types/ingredientsConstructor';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Проверка асинхронного thunk для Ingredients', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Тестирование успешного запроса', async () => {
    const expectedActions = [
      { type: OrderActionTypes.GET_ORDER_REQUEST },
      {
        type: OrderActionTypes.GET_ORDER_SUCCESS,
        orderNumber: undefined,
      },
      { type: IngredientsConstructorActionTypes.CLEAR_INGREDIENTS_CONSTRUCTOR },
    ];

    const store = mockStore({});

    // Проверка запроса.
    let accessToken = getCookie('accessToken');
    if (!accessToken) {
      accessToken = '';
    }

    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/orders`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: { ingredients: [] },
      },

      // response.
      {
        success: true,
        order: {
          ingredients: [{}],
        },
      }
    );

    // Проверка actions.
    return store.dispatch(actions({ ingredients: [] }) as any).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('Тестирование запроса с ошибкой', async () => {
    const expectedActions = [
      { type: OrderActionTypes.GET_ORDER_REQUEST },
      { type: OrderActionTypes.GET_ORDER_FAILED },
    ];

    const store = mockStore({});

    // Проверка запроса.
    let accessToken = getCookie('accessToken');
    if (!accessToken) {
      accessToken = '';
    }

    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/orders`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: accessToken,
        },
        body: { ingredients: [] },
      },

      // response.
      {
        success: false,
      }
    );

    // Проверка actions.
    return store.dispatch(actions({ ingredients: [] }) as any).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
