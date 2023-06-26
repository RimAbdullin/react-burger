export enum RegistrationActionTypes {
  POST_REGISTRATION_FAILED = 'POST_REGISTRATION_FAILED',
  POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS',
  POST_REGISTRATION_REQUEST = 'POST_REGISTRATION_REQUEST',
  RESET_STATE = 'RESET_STATE',
}

interface IGetRegistrationFailed {
  type: RegistrationActionTypes.POST_REGISTRATION_FAILED;
}

interface IGetRegistrationSuccess {
  type: RegistrationActionTypes.POST_REGISTRATION_SUCCESS;
  data: IRegistrationResponse;
}

interface IGetRegistrationRequest {
  type: RegistrationActionTypes.POST_REGISTRATION_REQUEST;
}

interface IRegistrationResetState {
  type: RegistrationActionTypes.RESET_STATE;
}

export type RegistrationAction =
  | IGetRegistrationFailed
  | IGetRegistrationSuccess
  | IGetRegistrationRequest
  | IRegistrationResetState;

export interface IRegistrationState {
  registrationRequest: boolean;
  registrationFailed: boolean;
}

export interface IRegistrationForm {
  name: string;
  email: string;
  password: string;
}

export interface IRegistrationResponse {
  message: string;
  success: boolean;
}
