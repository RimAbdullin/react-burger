import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { registrationThunk } from '../services/actions/registration';
import { getRegistrationSelector } from '../services/selectors/selector';
import { RESET_STATE } from '../services/actions/user';
import { useTypedSelector } from './useTypeSelector';

export const useRegistration = () => {
  const { registrationRequest, registrationFailed } = useTypedSelector(
    getRegistrationSelector
  );

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Регистрация пользователя.
  const registration = useCallback(
    (form) => {
      setIsLoading(true);
      try {
        dispatch(registrationThunk(form));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  // Проверяем результаты запроса регистрации пользователя.
  useEffect(() => {
    if (!isLoading && !registrationRequest && !registrationFailed) {
      // Если был сделан запрос registration и он завершен успешно
      // то в состоянии устанавливаем, что пользователь имеет статус зарегистрирован.
      setIsRegistered(true);
      // И сбрасываем все состояния в редукторе до первоначального.
      dispatch({
        type: RESET_STATE,
      });
    }
  }, [dispatch, isLoading, registrationRequest, registrationFailed]);

  return {
    isLoading,
    isRegistered,
    registration,
  };
};
