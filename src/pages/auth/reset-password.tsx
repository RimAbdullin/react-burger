import { useState } from 'react';
import styles from './reset-password.module.css';

import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPasswordPage() {
  let user = useUser();

  const [form, setValue] = useState({ password: '', code: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = (e: React.SyntheticEvent) => {
    if (!form.password && !form.code) {
      return;
    }
    e.preventDefault();
    user.passwordReset({ password: form.password, token: form.code });
  };

  // Проверяем, авторизован ли пользователь
  if (user.isAuthChecked && user.user) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Navigate to="/" replace />
    );
  }

  // Если еще выполняется запрос на изменение пароля, то ничего не выполняем.
  if (user.isLoadingPasswordReset) {
    return null;
  }

  // Если изменение пароля произошло успешно..
  if (user.isPasswordReset) {
    // Отправляем на страницу логина.
    return <Navigate to={'/login'} replace />;
  }

  // Если ранее не было отправлено письмо с кодом.
  if (!user.isEmailSent) {
    // Отправляем на страницу отправки письма.
    return <Navigate to={'/forgot-password'} replace />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={`mb-6 ${styles['title-container']}`}>
          <span className={`text_type_main-medium`}>Восстановление пароля</span>
        </div>

        <PasswordInput
          placeholder="Введите новый пароль"
          value={form.password}
          name="password"
          onChange={onChange}
          extraClass="mb-6"
        />

        <Input
          placeholder="Введите код из письма"
          value={form.code}
          name="code"
          onChange={onChange}
          extraClass="mb-6"
        />

        <div className={`mb-20 ${styles['actions']}`}>
          <div className={`${styles['button-container']}`}>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={handlePasswordReset}
            >
              Сохранить
            </Button>
          </div>
        </div>

        <div className={`${styles['bottom-title-container']}`}>
          <span className={`text_color_inactive text_type_main-default`}>
            Вспомнили пароль?
          </span>
          <Link to={'/login'} className="ml-2">
            <span className={`text_type_main-default ${styles['link']}`}>
              Войти
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
