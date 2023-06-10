import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector } from '../services/selectors/selector';
import { loginUser, refreshTokenThunk } from '../services/actions/auth';
import { SET_AUTH_STATUS } from '../services/actions/auth';

export const useAuth = () => {
  const { user, accessToken, refreshToken, isAuth } =
    useSelector(getAuthSelector);

  const dispatch = useDispatch();

  const login = useCallback(
    (form) => {
      dispatch(loginUser(form));
    },
    [dispatch]
  );

  const refresh = useCallback(
    // a1@a.ru.
    (token) => {
      dispatch(refreshTokenThunk(token));
    },
    [dispatch]
  );

  const checkAuth = useCallback(() => {
    if (!isAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        refresh(token);
      }
    }
    // dispatch(loginUser(form));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch({
      type: SET_AUTH_STATUS,
      value: false,
      accessToken: null,
    });
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    if (isAuth && refreshToken) {
      localStorage.setItem('token', refreshToken);
    }
  }, [isAuth]);

  return {
    isAuth,
    login,
    logout,
    user,
    accessToken,
    refreshToken,
    checkAuth,
  };
};
