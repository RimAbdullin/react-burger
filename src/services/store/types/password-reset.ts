export enum PasswordResetActionTypes {
  POST_PASSWORD_RESET_FAILED = 'POST_PASSWORD_RESET_FAILED',
  POST_PASSWORD_RESET_SUCCESS = 'POST_PASSWORD_RESET_SUCCESS',
  POST_PASSWORD_RESET_REQUEST = 'POST_PASSWORD_RESET_REQUEST',
  RESET_STATE = 'RESET_STATE',
}

interface IGetPasswordResetFailed {
  type: PasswordResetActionTypes.POST_PASSWORD_RESET_FAILED;
}

interface IGetPasswordResetSuccess {
  type: PasswordResetActionTypes.POST_PASSWORD_RESET_SUCCESS;
  data: IPasswordResetResponse;
}

interface IGetPasswordResetRequest {
  type: PasswordResetActionTypes.POST_PASSWORD_RESET_REQUEST;
}

interface IPasswordResetResetState {
  type: PasswordResetActionTypes.RESET_STATE;
}

export type PasswordResetAction =
  | IGetPasswordResetFailed
  | IGetPasswordResetSuccess
  | IGetPasswordResetRequest
  | IPasswordResetResetState;

export interface IPasswordResetState {
  passwordResetRequest: boolean;
  passwordResetFailed: boolean;
}

export interface IPasswordResetForm {
  password: string;
  code: string;
}

export interface IPasswordResetResponse {
  message: string;
  success: boolean;
}
