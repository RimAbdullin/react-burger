import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { passwordResetThunk as actions } from './password-reset';
import { PasswordResetActionTypes } from '../store/types/password-reset';
import fetchMock from 'fetch-mock';
import { NORMA_API } from '../../data/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Проверка асинхронного thunk для PasswordReset', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Тестирование успешного запроса', async () => {
    const expectedActions = [
      { type: PasswordResetActionTypes.POST_PASSWORD_RESET_REQUEST },
      {
        type: PasswordResetActionTypes.POST_PASSWORD_RESET_SUCCESS,
        data: { message: 'Password successfully reset', success: true },
      },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/password-reset/reset`,
        body: { password: '123', token: '123' },
        headers: { 'Content-Type': 'application/json' },
      },

      // response.
      {
        message: 'Password successfully reset',
        success: true,
      }
    );

    // Проверка actions.
    return store
      .dispatch(actions({ password: '123', token: '123' }) as any)
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });
});
