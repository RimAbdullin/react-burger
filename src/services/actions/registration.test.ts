import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { registrationThunk as actions } from './registration';
import { RegistrationActionTypes } from '../store/types/registration';
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
      { type: RegistrationActionTypes.POST_REGISTRATION_REQUEST },
      {
        type: RegistrationActionTypes.POST_REGISTRATION_SUCCESS,
        data: { message: 'Reset email sent', success: true },
      },
    ];

    const store = mockStore({});

    // Проверка запроса.
    fetchMock.post(
      // request options.
      {
        url: `${NORMA_API}/auth/register`,
        body: { name: '1', email: 'a@a.ru', password: 'new-password' },
        headers: { 'Content-Type': 'application/json' },
      },

      // response.
      {
        message: 'Reset email sent',
        success: true,
      }
    );

    // Проверка actions.
    return store
      .dispatch(
        actions({ name: '1', email: 'a@a.ru', password: 'new-password' }) as any
      )
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });
});
