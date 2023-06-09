import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrationUser } from '../services/actions/auth';
import { getAuthSelector } from '../services/selectors/selector';

export const useAuth = () => {
  const { user, accessToken, refreshToken, isRegistered, isAuth } =
    useSelector(getAuthSelector);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    user: { name: '', email: '' },
    accessToken: null,
    refreshToken: null,
    isRegistered: false,
    isAuth: false,
  });

  const registration = useCallback(
    (form) => {
      console.log('=== hook registration');
      setState(true);
      dispatch(registrationUser(form));
    },
    [dispatch]
  );

  const login = useCallback(() => {
    setState(true);
  }, []);

  const logout = useCallback(() => {
    setState(true);
  }, []);

  return {
    isRegistered,
    isAuth,
    registration,
    login,
    logout,
  };
};
