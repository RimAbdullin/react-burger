import { useState } from 'react';
import styles from './reset-password.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// import { useAuth } from '../services/auth';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPasswordPage() {
  let auth = useAuth();

  const [form, setValue] = useState({ password: '', code: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    auth.passwordReset({ password: form.password, token: form.code });
    navigate('/');
  };

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
