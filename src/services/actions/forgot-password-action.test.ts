import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { forgotPasswordThunk as actions } from './forgot-password';
import {
  ForgotPasswordActionTypes,
  ForgotPasswordActionTypes as types,
} from '../store/types/forgot-password';
import fetchMock from 'fetch-mock';
import { NORMA_API } from '../../data/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Проверка асинхронного thunk для ForgotPassword', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Тестирование успешного запроса', async () => {
    const expectedActions = [
      { type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_REQUEST },
      {
        type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_SUCCESS,
        data: { message: 'Reset email sent', success: true },
      },
      { type: ForgotPasswordActionTypes.SET_FORGOT_PASSWORD, value: true },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/password-reset`,
        body: { email: '123' },
        headers: { 'Content-Type': 'application/json' },
      },

      // response.
      {
        message: 'Reset email sent',
        success: true,
      }
    );

    // Проверка actions.
    return store.dispatch(actions({ email: '123' }) as any).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
