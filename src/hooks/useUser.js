import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserThunk, updateUserThunk } from '../services/actions/user';

import { userSelector } from '../services/selectors/selector';

export const useUser = () => {
  const { refreshTokenRequest, refreshTokenFailed } = useSelector(
    getRefreshTokenSelector
  );

  const { getUserFailed, user } = useSelector(userSelector);

  // const [isRetry, setIsRetry] = useState(false);

  const [isLoadingCheckAuth, setIsLoadingCheckAuth] = useState(false);

  const [isAuth, setIsAuth] = useState(false);

  const dispatch = useDispatch();

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
