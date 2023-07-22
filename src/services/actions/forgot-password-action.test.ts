import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { forgotPasswordThunk as actions } from './forgot-password';
import {
  IForgotPasswordState,
  ForgotPasswordActionTypes as types,
} from '../store/types/forgot-password';
import fetchMock from 'fetch-mock';
import { NORMA_API } from '../../data/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const moduleName = require('../actions/forgot-password.ts');

describe('ForgotPassword', () => {
  let response;

  // moduleName.beforeEach(() => {
  //   response = { success: true, message: '' };
  // });

  afterEach(() => {
    fetchMock.restore();
  });

  it('post ForgotPassword', () => {
    const test = `${NORMA_API}/password-reset`;
    fetchMock.postOnce({ url: test, method: 'POST' }, { body: '' });

    const expectedActions = [
      { type: types.POST_FORGOT_PASSWORD_REQUEST },
      // {
      //   type: types.POST_FORGOT_PASSWORD_SUCCESS,
      //   body: { email: '' },
      // },
      // { type: types.POST_FORGOT_PASSWORD_FAILED },
      // { type: types.SET_FORGOT_PASSWORD, value: true },
      // { type: types.RESET_STATE },
    ];

    const store = mockStore({
      // isEmailSent: false,
      // forgotPasswordRequest: true,
      // forgotPasswordFailed: false,
    } as IForgotPasswordState);

    console.log('=== store', store.getActions());

    const test1 = store.dispatch(actions({ email: '' }) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    console.log(test1);

    // expect(test1).toEqual(expectedActions);

    // return store.dispatch(actions({ email: '' }) as any).then(() => {
    //   expect(store.getActions()).toEqual(expectedActions);
    // });
  });
});
