import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector } from '../services/selectors/selector';
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  getUserThunk,
} from '../services/actions/auth';

export const useAuth = () => {
  const { user, isAuth } = useSelector(getAuthSelector);

  const dispatch = useDispatch();

  const login = useCallback(
    (form) => {
      dispatch(loginThunk(form));
    },
    [dispatch]
  );

  const refresh = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(refreshThunk(refreshToken));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutThunk(localStorage.getItem('refreshToken')));
  }, []);

  const getUser = useCallback(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserThunk(accessToken));
  }, [dispatch]);

  return {
    isAuth,
    login,
    refresh,
    logout,
    user,
    getUser,
  };
};
