import { useEffect, useState } from 'react';
import styles from './forgot-password.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {
  let auth = useAuth();

  const [form, setValue] = useState({ email: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRestore = (e) => {
    e.preventDefault();
    if (!form.email) {
      return;
    }
    auth.forgotPassword(form);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isEmailSent) {
      navigate('/reset-password');
    }
  }, [auth.isEmailSent]);

  // Если еще выполняется запрос на регистрацию, то ничего не выполняем.
  if (auth.isLoadingForgotPassword) {
    return null;
  }

  // Проверяем, авторизован ли пользователь
  if (auth.isAuth) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Navigate to="/" replace />
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={`mb-6 ${styles['title-container']}`}>
          <span className={`text_type_main-medium`}>Восстановление пароля</span>
        </div>
        <Input
          placeholder="Email"
          value={form.email}
          name="email"
          onChange={onChange}
          extraClass="mb-6"
        />
        <div className={`mb-20 ${styles['actions']}`}>
          <div className={`${styles['button-container']}`}>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={handleRestore}
            >
              Восстановить
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
