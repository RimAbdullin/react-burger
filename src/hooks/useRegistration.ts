import { useState, useEffect, useCallback } from 'react';
import { registrationThunk } from '../services/actions/registration';
import { getRegistrationSelector } from '../services/selectors/selector';
import { useTypedSelector } from './useTypeSelector';
import { useAppDispatch } from './hooks';
import {
  IRegistrationForm,
  RegistrationActionTypes,
} from '../services/store/types/registration';

export const useRegistration = () => {
  const { registrationRequest, registrationFailed } = useTypedSelector(
    getRegistrationSelector
  );

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  // Регистрация пользователя.
  const registration = useCallback(
    (form: IRegistrationForm) => {
      setIsLoading(true);
      try {
        dispatch(registrationThunk(form) as any);
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
        type: RegistrationActionTypes.RESET_STATE,
      });
    }
  }, [dispatch, isLoading, registrationRequest, registrationFailed]);

  return {
    isLoading,
    isRegistered,
    registration,
  };
};
