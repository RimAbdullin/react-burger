import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  checkAuthThunk,
  getUserThunk,
  updateUserThunk,
} from '../services/actions/user';

import {
  getUserSelector,
  getForgotPasswordSelector,
  getPasswordResetSelector,
} from '../services/selectors/selector';
import { RESET_STATE, loginThunk, logoutThunk } from '../services/actions/user';

import { forgotPasswordThunk } from '../services/actions/forgot-password';
import { passwordResetThunk } from '../services/actions/password-reset';
import { SET_FORGOT_PASSWORD } from '../services/actions/forgot-password';
import { useTypedSelector } from './useTypeSelector';
import { IForgotPasswordForm } from '../services/store/types/forgot-password';
import { useAppDispatch } from './hooks';

export const useUser = () => {
  const {
    isAuthChecked,
    user,
    getUserRequest,
    getUserFailed,
    updateUserRequest,
    updateUserFailed,
    loginRequest,
    loginFailed,
    refreshTokenRequest,
    refreshTokenFailed,
    logoutRequest,
    logoutFailed,
  } = useTypedSelector(getUserSelector);

  const [isLoadingGetUser, setIsLoadingGetUser] = useState(false);
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false);

  const { isEmailSent, forgotPasswordRequest, forgotPasswordFailed } =
    useTypedSelector(getForgotPasswordSelector);

  const { passwordResetRequest, passwordResetFailed } = useTypedSelector(
    getPasswordResetSelector
  );

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingCheckAuth, setIsLoadingCheckAuth] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const [isLoadingForgotPassword, setIsLoadingForgotPassword] = useState(false);
  const [isLoadingPasswordReset, setIsLoadingPasswordReset] = useState(false);

  const [isLogout, setIsLogout] = useState(false);

  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const dispatch = useAppDispatch();

  // Получение данных пользователя.
  const getUser = useCallback(() => {
    setIsLoadingGetUser(true);
    try {
      dispatch(getUserThunk());
    } catch (error) {
    } finally {
      setIsLoadingGetUser(false);
    }
  }, [dispatch]);

  // Проверяем получены ли данные пользователя.
  useEffect(() => {
    if (!isLoadingGetUser && !getUserRequest && !getUserFailed) {
      // Если был сделан запрос getUser и он завершен успешно, то сбрасываем состояние.
      dispatch({
        type: RESET_STATE,
      });
    }
  }, [dispatch, isLoadingGetUser, getUserRequest, getUserFailed]);

  // Обновление данных пользователя.
  const updateUser = useCallback(
    (form) => {
      setIsLoadingUpdateUser(true);
      try {
        dispatch(updateUserThunk(form));
      } catch (error) {
      } finally {
        setIsLoadingUpdateUser(false);
      }
    },
    [dispatch]
  );

  // Проверяем получены ли данные пользователя.
  useEffect(() => {
    if (!isLoadingUpdateUser && !updateUserRequest && !updateUserFailed) {
      // Если был сделан запрос getUser и он завершен успешно, то сбрасываем состояние.
      dispatch({
        type: RESET_STATE,
      });
    }
  }, [dispatch, isLoadingUpdateUser, updateUserRequest, updateUserFailed]);

  // Проверяем авторизован ли пользователь.
  const checkAuth = () => {
    setIsLoadingCheckAuth(true);
    try {
      dispatch(checkAuthThunk());
    } catch (error) {
    } finally {
      setIsLoadingCheckAuth(false);
    }
  };

  // Проверяем результаты запроса проверки пользователя.
  useEffect(() => {
    if (!isLoadingCheckAuth && !refreshTokenRequest && !refreshTokenFailed) {
      // Если был сделан запрос refreshToken и он завершен успешно, то сбрасываем состояние.
      dispatch({
        type: RESET_STATE,
      });
    }
  }, [dispatch, isLoadingCheckAuth, refreshTokenRequest, refreshTokenFailed]);

  // Логин пользователя.
  const login = useCallback(
    (form) => {
      setIsLoadingLogin(true);
      try {
        dispatch(loginThunk(form));
      } catch (error) {
      } finally {
        setIsLoadingLogin(false);
      }
    },
    [dispatch]
  );

  // Проверяем результаты запроса авторизации пользователя.
  useEffect(() => {
    if (!isLoadingLogin && !loginRequest && !loginFailed) {
      // Если был сделан запрос login и он завершен успешно, то сбрасываем состояние.
      dispatch({
        type: RESET_STATE,
      });
    }
  }, [dispatch, isLoadingLogin, loginRequest, loginFailed]);

  // Выход пользователя.
  const logout = useCallback(() => {
    setIsLoadingLogout(true);
    try {
      dispatch(logoutThunk());
    } catch (error) {
    } finally {
      setIsLoadingLogout(false);
    }
  }, [dispatch]);

  // Проверяем результаты запроса выхода пользователя.
  useEffect(() => {
    if (!isLoadingLogout && !logoutRequest && !logoutFailed) {
      // Если был сделан запрос logout и он завершен успешно
      // то сбрасываем состояние.
      dispatch({
        type: RESET_STATE,
      });
      setIsLogout(true);
    }
  }, [dispatch, isLoadingLogout, logoutRequest, logoutFailed]);

  // Сброс пароля пользователя.
  const forgotPassword = useCallback(
    (form: IForgotPasswordForm) => {
      setIsLoadingForgotPassword(true);
      try {
        dispatch(forgotPasswordThunk(form));
      } catch (error) {
      } finally {
        setIsLoadingForgotPassword(false);
      }
    },
    [dispatch]
  );

  // Проверяем результаты запроса сброса пароля пользователя.
  useEffect(() => {
    if (
      !isLoadingForgotPassword &&
      !forgotPasswordRequest &&
      !forgotPasswordFailed
    ) {
      // Если был сделан запрос forgot-password и он завершен успешно.
      dispatch({
        type: RESET_STATE,
      });
      dispatch({
        type: SET_FORGOT_PASSWORD,
        value: true,
      });
    }
  }, [
    dispatch,
    isLoadingForgotPassword,
    forgotPasswordRequest,
    forgotPasswordFailed,
  ]);

  // Изменение пароля пользователя.
  const passwordReset = useCallback(
    (form) => {
      setIsLoadingPasswordReset(true);
      try {
        dispatch(passwordResetThunk(form));
      } catch (error) {
      } finally {
        setIsLoadingPasswordReset(false);
      }
    },
    [dispatch]
  );

  // Проверяем результаты запроса изменения пароля пользователя.
  useEffect(() => {
    if (
      !isLoadingPasswordReset &&
      !passwordResetRequest &&
      !passwordResetFailed
    ) {
      // Если был сделан запрос refreshToken и он завершен успешно
      // то в состоянии устанавливаем, что пользователь имеет статус авторизован.
      setIsPasswordReset(true);
      dispatch({
        type: RESET_STATE,
      });
      dispatch({
        type: SET_FORGOT_PASSWORD,
        value: false,
      });
      setIsPasswordReset(true);
    }
  }, [
    dispatch,
    isLoadingPasswordReset,
    passwordResetRequest,
    passwordResetFailed,
  ]);

  return {
    isAuthChecked,

    isLoadingGetUser,
    isLoadingUpdateUser,
    isLoadingLogin,
    isLoadingCheckAuth,
    isLoadingLogout,
    isLoadingForgotPassword,
    isLoadingPasswordReset,

    isEmailSent,
    isLogout,
    isPasswordReset,

    login,
    checkAuth,
    logout,

    forgotPassword,
    passwordReset,

    user,
    getUser,
    updateUser,
  };
};
