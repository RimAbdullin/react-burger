import {
  registrationReducer as reducer,
  registrationInitialState,
} from './registration';
import * as types from '../store/types/registration';

describe('registration reducer', () => {
  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual(registrationInitialState);
  });

  it('POST_REGISTRATION_REQUEST', () => {
    expect(
      reducer({} as types.IRegistrationState, {
        type: types.RegistrationActionTypes.POST_REGISTRATION_REQUEST,
      })
    ).toEqual({
      registrationRequest: true,
      registrationFailed: false,
    });
  });

  it('POST_REGISTRATION_SUCCESS', () => {
    expect(
      reducer({} as types.IRegistrationState, {
        type: types.RegistrationActionTypes.POST_REGISTRATION_SUCCESS,
        data: {} as types.IRegistrationResponse,
      })
    ).toEqual({
      registrationRequest: false,
      registrationFailed: false,
    });
  });

  it('POST_REGISTRATION_FAILED', () => {
    expect(
      reducer({} as types.IRegistrationState, {
        type: types.RegistrationActionTypes.POST_REGISTRATION_FAILED,
      })
    ).toEqual({
      registrationFailed: true,
      registrationRequest: false,
    });
  });

  it('RESET_STATE', () => {
    expect(
      reducer({} as types.IRegistrationState, {
        type: types.RegistrationActionTypes.RESET_STATE,
      })
    ).toEqual({
      registrationRequest: true,
      registrationFailed: false,
    });
  });
});
