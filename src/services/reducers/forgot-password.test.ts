import { forgotPasswordReducer as reducer } from './forgot-password';
import * as types from '../store/types/forgot-password';

describe('forgot-password reducer', () => {
  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      isEmailSent: false,
      forgotPasswordRequest: true,
      forgotPasswordFailed: false,
    });
  });

  it('POST_FORGOT_PASSWORD_REQUEST', () => {
    expect(
      reducer({} as types.IForgotPasswordState, {
        type: types.ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual({
      forgotPasswordRequest: true,
      forgotPasswordFailed: false,
    });
  });

  it('POST_FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      reducer({} as types.IForgotPasswordState, {
        type: types.ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_SUCCESS,
        data: {} as types.IForgotPasswordResponse,
      })
    ).toEqual({
      forgotPasswordRequest: false,
      forgotPasswordFailed: false,
    });
  });

  it('POST_FORGOT_PASSWORD_FAILED', () => {
    expect(
      reducer({} as types.IForgotPasswordState, {
        type: types.ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_FAILED,
      })
    ).toEqual({
      forgotPasswordFailed: true,
      forgotPasswordRequest: false,
    });
  });

  it('SET_FORGOT_PASSWORD', () => {
    expect(
      reducer({} as types.IForgotPasswordState, {
        type: types.ForgotPasswordActionTypes.SET_FORGOT_PASSWORD,
        value: false,
      })
    ).toEqual({
      isEmailSent: false,
    });

    expect(
      reducer({} as types.IForgotPasswordState, {
        type: types.ForgotPasswordActionTypes.SET_FORGOT_PASSWORD,
        value: true,
      })
    ).toEqual({
      isEmailSent: true,
    });
  });

  it('RESET_STATE', () => {
    expect(
      reducer({} as types.IForgotPasswordState, {
        type: types.ForgotPasswordActionTypes.RESET_STATE,
      })
    ).toEqual({
      forgotPasswordRequest: true,
      forgotPasswordFailed: false,
    });
  });
});
