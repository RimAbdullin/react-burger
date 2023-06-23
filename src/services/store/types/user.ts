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
  data: IUserResponse;
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
  data: IUserResponse;
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
  data: IUserResponse;
}

interface IPostUserLogoutRequest {
  type: UserActionTypes.POST_LOGOUT_REQUEST;
}

// get user.
interface IGetUserFailed {
  type: UserActionTypes.GET_USER_FAILED;
}

interface IGetUserSuccess {
  type: UserActionTypes.GET_USER_SUCCESS;
  data: IUserResponse;
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
  data: IUserResponse;
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
  data: IUserResponse;
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
  isEmailSent: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
}

export interface IUserForm {
  email: string;
}

export interface IUserResponse {
  message: string;
  success: boolean;
}
