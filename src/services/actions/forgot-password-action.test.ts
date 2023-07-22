import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { forgotPasswordThunk as actions } from './forgot-password';
import {
  ForgotPasswordActionTypes,
  IForgotPasswordState,
  ForgotPasswordActionTypes as types,
} from '../store/types/forgot-password';
import fetchMock from 'fetch-mock';
import { NORMA_API } from '../../data/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test thunk action creator', () => {
  it('expected actions should be dispatched on successful request', () => {
    const store = mockStore({});
    const expectedActions = [
      ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_REQUEST,
      ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_SUCCESS,
    ];

    // Mock the fetch() global to always return the same value for GET
    // requests to all URLs.
    fetchMock.get('*', { response: 200 });

    return store.dispatch(actions({ email: '' }) as any).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expectedActions);
    });

    fetchMock.restore();
  });

  it('expected actions should be dispatched on failed request', () => {
    const store = mockStore({});
    const expectedActions = [
      ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_REQUEST,
      ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_FAILED,
    ];
    // Mock the fetch() global to always return the same value for GET
    // requests to all URLs.
    fetchMock.get('*', { response: 404 });

    return store.dispatch(actions({ email: '' }) as any).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expectedActions);
    });

    fetchMock.restore();
  });
});

// jest.mock('redux/do-something', () => () => 'do something mock');

// jest.mock('redux/do-something-else', () => () => 'do something else mock');

// describe('functionToTest', () => {
//   test('my test', async () => {
//     // <= async test function
//     const dispatch = jest.fn();
//     await actions({ email: '' })(dispatch); // <= await the Promise
//     expect(dispatch.mock.calls[0][0]).toBe('do something mock'); // Success!
//     expect(dispatch.mock.calls[1][0]).toBe('do something else mock'); // Success!
//   });
// });

// describe('ForgotPassword', () => {
//   let response;

//   // moduleName.beforeEach(() => {
//   //   response = { success: true, message: '' };
//   // });

//   afterEach(() => {
//     fetchMock.restore();
//   });

//   it('post ForgotPassword', () => {
//     const test = `${NORMA_API}/password-reset`;
//     fetchMock.postOnce({ url: test, method: 'POST' }, { body: '' });

//     const expectedActions = [
//       { type: types.POST_FORGOT_PASSWORD_REQUEST },
//       // {
//       //   type: types.POST_FORGOT_PASSWORD_SUCCESS,
//       //   body: { email: '' },
//       // },
//       // { type: types.POST_FORGOT_PASSWORD_FAILED },
//       // { type: types.SET_FORGOT_PASSWORD, value: true },
//       // { type: types.RESET_STATE },
//     ];

//     const store = mockStore({
//       // isEmailSent: false,
//       // forgotPasswordRequest: true,
//       // forgotPasswordFailed: false,
//     } as IForgotPasswordState);

//     console.log('=== store', store.getActions());

//     const test1 = store.dispatch(actions({ email: '' }) as any).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });

//     console.log(test1);

//     // expect(test1).toEqual(expectedActions);

//     // return store.dispatch(actions({ email: '' }) as any).then(() => {
//     //   expect(store.getActions()).toEqual(expectedActions);
//     // });
//   });
// });
