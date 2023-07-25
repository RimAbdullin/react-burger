import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './user';
import { UserActionTypes } from '../store/types/user';
import fetchMock from 'fetch-mock';
import { NORMA_API } from '../../data/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Проверка асинхронных thunk для user', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Тестирование успешного запроса getUserThunk', async () => {
    const expectedActions = [
      { type: UserActionTypes.GET_USER_REQUEST },
      {
        type: UserActionTypes.GET_USER_SUCCESS,
        data: { success: true, user: { email: 'a@a.ru', name: 'username' } },
      },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.get(
      // request options.
      {
        url: `${NORMA_API}/auth/user`,
        headers: { 'Content-Type': 'application/json' },
      },

      // response.
      { success: true, user: { email: 'a@a.ru', name: 'username' } }
    );

    // Проверка actions.
    return store.dispatch(actions.getUserThunk() as any).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('Тестирование успешного запроса updateUserThunk', async () => {
    const expectedActions = [
      { type: UserActionTypes.UPDATE_USER_REQUEST },
      {
        type: UserActionTypes.UPDATE_USER_SUCCESS,
        data: { success: true, user: { email: 'a@a.ru', name: 'username' } },
      },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.patch(
      // request options.
      {
        url: `${NORMA_API}/auth/user`,
        body: {
          name: 'new_user',
          email: 'new_email.email.ro.ru',
          password: 'new_password',
        },
        headers: { 'Content-Type': 'application/json' },
      },

      // response.
      {
        success: true,
        user: { email: 'a@a.ru', name: 'username' },
      }
    );

    // Проверка actions.
    return store
      .dispatch(
        actions.updateUserThunk({
          name: 'new_user',
          email: 'new_email.email.ro.ru',
          password: 'new_password',
        }) as any
      )
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('Тестирование успешного запроса loginThunk', async () => {
    const expectedActions = [
      { type: UserActionTypes.POST_LOGIN_REQUEST },
      {
        type: UserActionTypes.POST_LOGIN_SUCCESS,
        data: { success: true, user: { email: 'a@a.ru', name: 'username' } },
      },
      { type: UserActionTypes.AUTH_CHECKED },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/auth/login`,
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: 'a@a.ru',
          password: 'new_password',
        },
      },

      // response.
      { success: true, user: { email: 'a@a.ru', name: 'username' } }
    );

    // Проверка actions.
    return store
      .dispatch(
        actions.loginThunk({
          email: 'a@a.ru',
          password: 'new_password',
        }) as any
      )
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('Тестирование успешного запроса logoutThunk', async () => {
    const expectedActions = [
      { type: UserActionTypes.POST_LOGOUT_REQUEST },
      {
        type: UserActionTypes.POST_LOGOUT_SUCCESS,
        data: { success: true, message: 'Successful logout' },
      },
      { type: UserActionTypes.RESET_STATE },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/auth/logout`,
        headers: { 'Content-Type': 'application/json' },
      },

      // response.
      { success: true, message: 'Successful logout' }
    );

    // Проверка actions.
    return store.dispatch(actions.logoutThunk() as any).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('Тестирование успешного запроса refreshTokenThunk', async () => {
    const expectedActions = [
      { type: UserActionTypes.POST_REFRESH_TOKEN_REQUEST },
      {
        type: UserActionTypes.POST_REFRESH_TOKEN_SUCCESS,
        data: { success: true, accessToken: 'Bearer 123', refreshToken: '123' },
      },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/auth/token`,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      },

      // response.
      {
        success: true,
        accessToken: 'Bearer 123',
        refreshToken: '123',
      }
    );

    // Проверка actions.
    return store.dispatch(actions.refreshTokenThunk() as any).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
