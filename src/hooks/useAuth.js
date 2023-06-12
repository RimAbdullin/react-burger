import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registrationThunk } from '../services/actions/registration';
import { loginThunk } from '../services/actions/login';
import { refreshThunk } from '../services/actions/refresh';
import { logoutThunk } from '../services/actions/logout';
import { getUserThunk, updateUserThunk } from '../services/actions/user';

import {
  getLoginSelector,
  getLogoutSelector,
  getRefreshTokenSelector,
  userSelector,
  getRegistrationSelector,
  getForgotPasswordSelector,
  getPasswordResetSelector,
  getAuthSelector,
} from '../services/selectors/selector';

import { forgotPasswordThunk } from '../services/actions/forgot-password';
import { passwordResetThunk } from '../services/actions/password-reset';
import { SET_AUTH } from '../services/actions/auth';
import { RESET_STATE } from '../services/actions/logout';

export const useAuth = () => {
  const { registrationRequest, registrationFailed } = useSelector(
    getRegistrationSelector
  );

  const { loginRequest, loginFailed } = useSelector(getLoginSelector);

  const { refreshTokenRequest, refreshTokenFailed } = useSelector(
    getRefreshTokenSelector
  );

  const { logoutRequest, logoutFailed } = useSelector(getLogoutSelector);

  const { forgotPasswordRequest, forgotPasswordFailed } = useSelector(
    getForgotPasswordSelector
  );

  const { passwordResetRequest, passwordResetFailed } = useSelector(
    getPasswordResetSelector
  );

  const { getUserFailed, user } = useSelector(userSelector);

  const { isAuth } = useSelector(getAuthSelector);

  // const [isRetry, setIsRetry] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingCheckAuth, setIsLoadingCheckAuth] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isLoadingForgotPassword, setIsLoadingForgotPassword] = useState(false);
  const [isLoadingPasswordReset, setIsLoadingPasswordReset] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const dispatch = useDispatch();

  // Регистрация пользователя.
  const registration = useCallback(
    (form) => {
      setIsLoadingRegistration(true);
      try {
        dispatch(registrationThunk(form));
      } catch (error) {
      } finally {
        setIsLoadingRegistration(false);
      }
    },
    [dispatch]
  );

  // Проверяем результаты запроса регистрации пользователя.
  useEffect(() => {
    if (!isLoadingRegistration && !registrationRequest && !registrationFailed) {
      // Если был сделан запрос registration и он завершен успешно
      // то в состоянии устанавливаем, что пользователь имеет статус зарегистрирован.
      setIsRegistered(true);
    }
  }, [isLoadingRegistration, registrationRequest, registrationFailed]);

  // Проверяем авторизован ли пользователь.
  const checkAuth = () => {
    setIsLoadingCheckAuth(true);
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      dispatch(refreshThunk(refreshToken));
    } catch (error) {
    } finally {
      setIsLoadingCheckAuth(false);
    }
  };

  // Проверяем результаты запроса проверки пользователя.
  useEffect(() => {
    if (!isLoadingCheckAuth && !refreshTokenRequest && !refreshTokenFailed) {
      // Если был сделан запрос refreshToken и он завершен успешно
      // то в состояние устанавливаем, что пользователь имеет статус авторизован.
      // setIsAuth(true);
      dispatch({
        type: SET_AUTH,
        value: true,
        caller: 'checkAuth',
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
      // Если был сделан запрос refreshToken и он завершен успешно
      // то в состоянии устанавливаем, что пользователь имеет статус авторизован.
      // setIsAuth(true);
      dispatch({
        type: SET_AUTH,
        value: true,
        caller: 'login',
      });
    }
  }, [dispatch, isLoadingLogin, loginRequest, loginFailed]);

  // Выход пользователя.
  const logout = useCallback(() => {
    console.log('logout 1');
    setIsLoadingLogout(true);
    try {
      dispatch(logoutThunk(localStorage.getItem('refreshToken')));
    } catch (error) {
    } finally {
      setIsLoadingLogout(false);
      dispatch({
        type: SET_AUTH,
        value: false,
        caller: 'logout',
      });
      dispatch({
        type: RESET_STATE,
      });
    }
  }, [dispatch]);

  // Проверяем результаты запроса выхода пользователя.
  useEffect(() => {
    console.log('logout 2');
    if (!isLoadingLogout && !logoutRequest && !logoutFailed) {
      console.log('logout 3');
      // Если был сделан запрос logout и он завершен успешно
      // то в состоянии устанавливаем, что пользователь имеет статус не авторизован и произвел выход.
      // setIsAuth(false);
      dispatch({
        type: SET_AUTH,
        value: false,
        caller: 'logout',
      });
      setIsLogout(true);
    }
  }, [isLoadingLogout, logoutRequest, logoutFailed]);
  // }, [dispatch, isLoadingLogout, logoutRequest, logoutFailed]);

  // Сброс пароля пользователя.
  const forgotPassword = useCallback(
    (form) => {
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
      // Если был сделан запрос forgot-password и он завершен успешно
      // то в состоянии устанавливаем, что пользователь имеет статус авторизован.
      setIsForgotPassword(true);
    }
  }, [isLoadingForgotPassword, forgotPasswordRequest, forgotPasswordFailed]);

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

  // Проверяем результаты запроса выхода пользователя.
  useEffect(() => {
    if (
      !isLoadingPasswordReset &&
      !passwordResetRequest &&
      !passwordResetFailed
    ) {
      // Если был сделан запрос refreshToken и он завершен успешно
      // то в состоянии устанавливаем, что пользователь имеет статус авторизован.
      setIsPasswordReset(true);
    }
  }, [isLoadingPasswordReset, passwordResetRequest, passwordResetFailed]);

  // Получение данных пользователя.
  const getUser = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      dispatch(getUserThunk(token));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Если получение данных пользователя не произошло, обновляем токены.
  // useEffect(() => {
  //   setIsRetry(false);
  //   if (getUserFailed && !isRetry) {
  //     refresh();
  //     if (successRefresh) {
  //       getUser();
  //     }
  //     setIsRetry(true);
  //   }
  // }, [getUserFailed]);

  // Обновление данных пользователя.
  const updateUser = useCallback(
    (form) => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      try {
        dispatch(updateUserThunk(token, form));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return {
    isLoadingRegistration,
    isLoadingLogin,
    isLoadingCheckAuth,
    isLoadingLogout,

    isRegistered,
    isAuth,
    isLogout,
    isForgotPassword,
    isPasswordReset,

    registration,
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
