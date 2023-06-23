export enum ForgotPasswordActionTypes {
  POST_FORGOT_PASSWORD_FAILED = 'POST_FORGOT_PASSWORD_FAILED',
  POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS',
  POST_FORGOT_PASSWORD_REQUEST = 'POST_FORGOT_PASSWORD_REQUEST',
  RESET_STATE = 'RESET_STATE',
  SET_FORGOT_PASSWORD = 'SET_FORGOT_PASSWORD',
}

interface IGetForgotPasswordFailed {
  type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_FAILED;
}

interface IGetForgotPasswordSuccess {
  type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_SUCCESS;
  data: IForgotPasswordResponse;
}

interface IGetForgotPasswordRequest {
  type: ForgotPasswordActionTypes.POST_FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordResetState {
  type: ForgotPasswordActionTypes.RESET_STATE;
}

interface ISetForgotPassword {
  type: ForgotPasswordActionTypes.SET_FORGOT_PASSWORD;
  value: boolean;
}

export type ForgotPasswordAction =
  | IGetForgotPasswordFailed
  | IGetForgotPasswordSuccess
  | IGetForgotPasswordRequest
  | IForgotPasswordResetState
  | ISetForgotPassword;

export interface IForgotPasswordState {
  isEmailSent: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
}

export interface IForgotPasswordForm {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
  success: boolean;
}
