import { extend } from 'immutability-helper';

export enum UserActionTypes {
  POST_LOGIN_FAILED = 'POST_LOGIN_FAILED',
  POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS',
  POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST',

  POST_REFRESH_TOKEN_FAILED = 'POST_REFRESH_TOKEN_FAILED',
  POST_REFRESH_TOKEN_SUCCESS = 'POST_REFRESH_TOKEN_SUCCESS',
  POST_REFRESH_TOKEN_REQUEST = 'POST_REFRESH_TOKEN_REQUEST',

  POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED',
  POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS',
  POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST',

  GET_USER_FAILED = 'GET_USER_FAILED',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
  GET_USER_REQUEST = 'GET_USER_REQUEST',

  UPDATE_USER_FAILED = 'UPDATE_USER_FAILED',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',

  RESET_STATE = 'RESET_STATE',

  AUTH_CHECKED = 'AUTH_CHECKED',
}

// login.
interface IPostUserLoginFailed {
  type: UserActionTypes.POST_LOGIN_FAILED;
}

interface IPostUserLoginSuccess {
  type: UserActionTypes.POST_LOGIN_SUCCESS;
  data: IUserLoginResponse;
}

interface IPostUserLoginRequest {
  type: UserActionTypes.POST_LOGIN_REQUEST;
}

// refresh token.
interface IPostUserRefreshTokenFailed {
  type: UserActionTypes.POST_REFRESH_TOKEN_FAILED;
}

interface IPostUserRefreshTokenSuccess {
  type: UserActionTypes.POST_REFRESH_TOKEN_SUCCESS;
  data: IUserRefreshResponse;
}

interface IPostUserRefreshTokenRequest {
  type: UserActionTypes.POST_REFRESH_TOKEN_REQUEST;
}

// logout.
interface IPostUserLogoutFailed {
  type: UserActionTypes.POST_LOGOUT_FAILED;
}

interface IPostUserLogoutSuccess {
  type: UserActionTypes.POST_LOGOUT_SUCCESS;
  data: IUserLogoutResponse;
}

interface IPostUserLogoutRequest {
  type: UserActionTypes.POST_LOGOUT_REQUEST;
}

// get user.
interface IGetUserFailed {
  type: UserActionTypes.GET_USER_FAILED;
  payload: string;
}

interface IGetUserSuccess {
  type: UserActionTypes.GET_USER_SUCCESS;
  data: { user: IUser };
}

interface IGetUserRequest {
  type: UserActionTypes.GET_USER_REQUEST;
}

// update user.
interface IPostUserUpdateFailed {
  type: UserActionTypes.UPDATE_USER_FAILED;
}

interface IPostUserUpdateSuccess {
  type: UserActionTypes.UPDATE_USER_SUCCESS;
  data: { user: IUser };
}

interface IPostUserUpdateRequest {
  type: UserActionTypes.UPDATE_USER_REQUEST;
}

// reset state.
interface IUserResetState {
  type: UserActionTypes.RESET_STATE;
}

// auth checked.
interface IUserAuthChecked {
  type: UserActionTypes.AUTH_CHECKED;
  // data: IUserResponse;
}

export type UserAction =
  | IPostUserLoginFailed
  | IPostUserLoginSuccess
  | IPostUserLoginRequest
  | IPostUserRefreshTokenFailed
  | IPostUserRefreshTokenSuccess
  | IPostUserRefreshTokenRequest
  | IPostUserLogoutFailed
  | IPostUserLogoutSuccess
  | IPostUserLogoutRequest
  | IGetUserFailed
  | IGetUserSuccess
  | IGetUserRequest
  | IPostUserUpdateFailed
  | IPostUserUpdateSuccess
  | IPostUserUpdateRequest
  | IUserResetState
  | IUserAuthChecked;

export interface IUserState {
  isAuthChecked: boolean;
  user: null | IUser;
  // getUser.
  getUserRequest: boolean;
  getUserFailed: boolean;
  // updateUser.
  updateUserRequest: boolean;
  updateUserFailed: boolean;
  // login.
  loginRequest: boolean;
  loginFailed: boolean;
  // refresh.
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  // logout.
  logoutRequest: boolean;
  logoutFailed: boolean;
}

export interface IUser {
  name: string;
  email: string;
}

// form для обновления данных пользователя.
export interface IUserWithPassword extends IUser {
  password: string;
}

// response для получения и обновления данных пользователя.
export interface IUserResponse {
  user: IUser;
  success: boolean;
}

export interface IUserLoginForm {
  email: string;
  password: string;
}

export interface IUserLoginResponse extends IUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUserRefreshRequestBody {
  token: string;
}

export interface IUserRefreshResponse extends IUserLoginResponse {
  success: boolean;
}

export interface IUserLogoutResponse extends IUserRefreshResponse {
  message: string;
}
