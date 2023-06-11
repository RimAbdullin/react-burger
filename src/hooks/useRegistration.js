import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrationThunk } from '../services/actions/registration';
import { getRegistrationSelector } from '../services/selectors/selector';

export const useRegistration = () => {
  const { user, isSuccess, accessToken, refreshToken } = useSelector(
    getRegistrationSelector
  );

  const dispatch = useDispatch();

  const registration = useCallback(
    (form) => {
      dispatch(registrationThunk(form));
    },
    [dispatch]
  );

  const login = useCallback((form) => {}, []);

  const logout = useCallback(() => {}, []);

  return {
    user,
    isSuccess,
    registration,
    accessToken,
    refreshToken,
  };
};
