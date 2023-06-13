import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserThunk, updateUserThunk } from '../services/actions/user';

import { userSelector } from '../services/selectors/selector';

export const useUser = () => {
  // const { refreshTokenRequest, refreshTokenFailed } = useSelector(
  //   getRefreshTokenSelector
  // );

  const {
    getUserRequest,
    getUserFailed,
    updateUserRequest,
    updateUserFailed,
    user,
  } = useSelector(userSelector);

  // const [isRetry, setIsRetry] = useState(false);

  const [isLoadingCheckAuth, setIsLoadingCheckAuth] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Получение данных пользователя.
  const getUser = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      dispatch(getUserThunk(token));
    } catch (error) {
      console.log('=== error in useUser', error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Проверяем получены ли данные пользователя.
  // useEffect(() => {
  //   if (!isLoading && !getUserRequest && !getUserFailed) {
  //     // Если был сделан запрос login и он завершен успешно, то сбрасываем состояние.
  //     dispatch({
  //       type: RESET_STATE,
  //     });
  //   }
  // }, [dispatch, isLoading, getUserRequest, getUserFailed]);

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
    isLoading,
    user,
    getUser,
    updateUser,
  };
};
