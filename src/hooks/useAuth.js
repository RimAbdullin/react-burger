import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOGIN_RESET, loginThunk } from '../services/actions/login';
import { REFRESH_RESET, refreshThunk } from '../services/actions/refresh';
import { LOGOUT_RESET, logoutThunk } from '../services/actions/logout';
import {
  SET_AUTH,
  getUserThunk,
  updateUserThunk,
} from '../services/actions/user';

import {
  getLoginSelector,
  getLogoutSelector,
  getRefreshSelector,
  userSelector,
} from '../services/selectors/selector';
import { forgotPasswordThunk } from '../services/actions/forgot-password';
import { passwordResetThunk } from '../services/actions/password-reset';

export const useAuth = () => {
  const { user, isAuth } = useSelector(userSelector);
  const { successLogin } = useSelector(getLoginSelector);
  const { successRefresh } = useSelector(getRefreshSelector);
  const { successLogout } = useSelector(getLogoutSelector);

  const dispatch = useDispatch();

  // dispatch({
  //   type: SET_USER,
  //   user: data.user,
  // });

  // Логин пользователя.
  const login = useCallback(
    (form) => {
      dispatch(loginThunk(form));
    },
    [dispatch]
  );

  // Если логин пользователя произошел успешно, то устанавливаем статус авторизации.
  useEffect(() => {
    if (successLogin) {
      dispatch({
        type: SET_AUTH,
        value: true,
      });

      dispatch({
        type: LOGIN_RESET,
      });
    }
  }, [successLogin]);

  // Рефреш токена.
  const refresh = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(refreshThunk(refreshToken));
  }, [dispatch]);

  // Если рефреш токена произошел успешно, то устанавливаем статус авторизации.
  useEffect(() => {
    if (successRefresh) {
      dispatch({
        type: SET_AUTH,
        value: true,
      });

      dispatch({
        type: REFRESH_RESET,
      });
    }
  }, [successRefresh]);

  // Выход пользователя.
  const logout = useCallback(() => {
    dispatch(logoutThunk(localStorage.getItem('refreshToken')));
  }, []);

  // Если выход пользователя произошел успешно, то устанавливаем статус авторизации.
  useEffect(() => {
    if (successLogout) {
      dispatch({
        type: SET_AUTH,
        value: false,
      });
      dispatch({
        type: LOGOUT_RESET,
      });
    }
  }, [successLogout]);

  // Сброс пароля пользователя.
  const forgotPassword = useCallback(
    (form) => {
      dispatch(forgotPasswordThunk(form));
    },
    [dispatch]
  );

  // Изменение пароля пользователя.
  const passwordReset = useCallback(
    (form) => {
      dispatch(passwordResetThunk(form));
    },
    [dispatch]
  );

  // Получение данных пользователя.
  const getUser = useCallback(() => {
    const token = localStorage.getItem('token');
    dispatch(getUserThunk(token));
  }, [dispatch]);

  // Обновление данных пользователя.
  const updateUser = useCallback(
    (form) => {
      const token = localStorage.getItem('token');
      dispatch(updateUserThunk(token, form));
    },
    [dispatch]
  );

  return {
    isAuth,
    login,
    refresh,
    logout,
    forgotPassword,
    passwordReset,
    user,
    getUser,
    updateUser,
  };
};
