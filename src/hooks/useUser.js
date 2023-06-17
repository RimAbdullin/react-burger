import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserThunk, updateUserThunk } from '../services/actions/user';

import { userSelector } from '../services/selectors/selector';
import { RESET_STATE } from '../services/actions/user';

export const useUser = () => {
  const {
    getUserRequest,
    getUserFailed,
    updateUserRequest,
    updateUserFailed,
    user,
  } = useSelector(userSelector);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Получение данных пользователя.
  const getUser = useCallback(() => {
    setIsLoading(true);
    try {
      dispatch(getUserThunk());
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Проверяем получены ли данные пользователя.
  useEffect(() => {
    if (!isLoading && !getUserRequest && !getUserFailed) {
      // Если был сделан запрос getUser и он завершен успешно, то сбрасываем состояние.
      dispatch({
        type: RESET_STATE,
      });
    }
  }, [dispatch, isLoading, getUserRequest, getUserFailed]);

  // Обновление данных пользователя.
  const updateUser = useCallback(
    (form) => {
      setIsLoading(true);
      try {
        dispatch(updateUserThunk(form));
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
