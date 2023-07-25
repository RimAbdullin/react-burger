import { passwordResetReducer as reducer } from './password-reset';
import * as types from '../store/types/password-reset';

describe('password-reset reducer', () => {
  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      passwordResetRequest: true,
      passwordResetFailed: false,
    });
  });

  it('POST_PASSWORD_RESET_REQUEST', () => {
    expect(
      reducer({} as types.IPasswordResetState, {
        type: types.PasswordResetActionTypes.POST_PASSWORD_RESET_REQUEST,
      })
    ).toEqual({
      passwordResetRequest: true,
      passwordResetFailed: false,
    });
  });

  it('POST_PASSWORD_RESET_SUCCESS', () => {
    expect(
      reducer({} as types.IPasswordResetState, {
        type: types.PasswordResetActionTypes.POST_PASSWORD_RESET_SUCCESS,
        data: {} as types.IPasswordResetResponse,
      })
    ).toEqual({
      passwordResetRequest: false,
      passwordResetFailed: false,
    });
  });

  it('POST_PASSWORD_RESET_FAILED', () => {
    expect(
      reducer({} as types.IPasswordResetState, {
        type: types.PasswordResetActionTypes.POST_PASSWORD_RESET_FAILED,
      })
    ).toEqual({
      passwordResetFailed: true,
      passwordResetRequest: false,
    });
  });

  it('RESET_STATE', () => {
    expect(
      reducer({} as types.IPasswordResetState, {
        type: types.PasswordResetActionTypes.RESET_STATE,
      })
    ).toEqual({
      passwordResetRequest: true,
      passwordResetFailed: false,
    });
  });
});
