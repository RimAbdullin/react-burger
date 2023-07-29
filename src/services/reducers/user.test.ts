import { userReducer as reducer, userInitialState } from './user';
import * as types from '../store/types/user';

describe('user reducer', () => {
  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual(userInitialState);
  });

  // get user.
  it('GET_USER_FAILED', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.GET_USER_FAILED,
        payload: '',
      })
    ).toEqual({
      getUserFailed: true,
      getUserRequest: false,
    });
  });

  it('GET_USER_SUCCESS', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.GET_USER_SUCCESS,
        data: {} as types.IUserResponse,
      })
    ).toEqual({
      getUserRequest: false,
      getUserFailed: false,
      user: {},
    });
  });

  it('GET_USER_REQUEST', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.GET_USER_REQUEST,
      })
    ).toEqual({
      getUserRequest: true,
      getUserFailed: false,
    });
  });

  // update user.
  it('UPDATE_USER_FAILED', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.UPDATE_USER_FAILED,
      })
    ).toEqual({
      updateUserFailed: true,
      updateUserRequest: false,
    });
  });

  it('UPDATE_USER_SUCCESS', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.UPDATE_USER_SUCCESS,
        data: {} as types.IUserResponse,
      })
    ).toEqual({
      updateUserRequest: false,
      updateUserFailed: false,
      user: {},
    });
  });

  it('UPDATE_USER_REQUEST', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.UPDATE_USER_REQUEST,
      })
    ).toEqual({
      updateUserRequest: true,
      updateUserFailed: false,
    });
  });

  // login.
  it('POST_LOGIN_FAILED', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_LOGIN_FAILED,
      })
    ).toEqual({
      loginFailed: true,
      loginRequest: false,
    });
  });

  it('POST_LOGIN_SUCCESS', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_LOGIN_SUCCESS,
        data: {} as types.IUserLoginResponse,
      })
    ).toEqual({
      loginRequest: false,
      loginFailed: false,
      user: {},
    });
  });

  it('POST_LOGIN_REQUEST', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_LOGIN_REQUEST,
      })
    ).toEqual({
      loginRequest: true,
      loginFailed: false,
    });
  });

  // logout.
  it('POST_LOGOUT_FAILED', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_LOGOUT_FAILED,
      })
    ).toEqual({
      logoutFailed: true,
      logoutRequest: false,
    });
  });

  it('POST_LOGOUT_SUCCESS', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_LOGOUT_SUCCESS,
        data: {} as types.IUserLogoutResponse,
      })
    ).toEqual({
      logoutRequest: false,
      logoutFailed: false,
      isAuthChecked: false,
      user: null,
    });
  });

  it('POST_LOGOUT_REQUEST', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_LOGOUT_REQUEST,
      })
    ).toEqual({
      logoutRequest: true,
      logoutFailed: false,
    });
  });

  // refresh.
  it('POST_REFRESH_TOKEN_FAILED', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_REFRESH_TOKEN_FAILED,
      })
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenFailed: true,
    });
  });

  it('POST_REFRESH_TOKEN_SUCCESS', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_REFRESH_TOKEN_SUCCESS,
        data: {} as types.IUserRefreshResponse,
      })
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenFailed: false,
    });
  });

  it('POST_REFRESH_TOKEN_REQUEST', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.POST_REFRESH_TOKEN_REQUEST,
      })
    ).toEqual({
      refreshTokenRequest: true,
      refreshTokenFailed: false,
    });
  });

  it('RESET_STATE', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.RESET_STATE,
      })
    ).toEqual({
      getUserRequest: true,
      getUserFailed: false,
      // updateUser.
      updateUserRequest: true,
      updateUserFailed: false,
      // login.
      loginRequest: true,
      loginFailed: false,
      // refresh.
      refreshTokenRequest: true,
      refreshTokenFailed: false,
      // logout.
      logoutRequest: true,
      logoutFailed: false,
    });
  });

  //auth checked.
  it('AUTH_CHECKED', () => {
    expect(
      reducer({} as types.IUserState, {
        type: types.UserActionTypes.AUTH_CHECKED,
      })
    ).toEqual({
      isAuthChecked: true,
    });
  });
});
