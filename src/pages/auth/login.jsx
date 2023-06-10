import { useCallback, useEffect, useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const auth = useAuth();

  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      auth.login(form);
    },
    [auth, form]
  );

  useEffect(() => {
    if (auth.isAuth) {
      console.log('=== auth.user', auth.user);
      console.log('=== auth.accessToken', auth.accessToken);
      console.log('=== auth.refreshToken', auth.refreshToken);
      navigate('/');
    }
  }, [auth.isAuth]);

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={`mb-6 ${styles['title-container']}`}>
          <span className={`text_type_main-medium`}>Вход</span>
        </div>
        <Input
          placeholder="Email"
          value={form.email}
          name="email"
          onChange={onChange}
          extraClass="mb-6"
        />
        <PasswordInput
          placeholder="Пароль"
          value={form.password}
          name="password"
          onChange={onChange}
          extraClass="mb-6"
        />
        <div className={`mb-20 ${styles['actions']}`}>
          <div className={`${styles['button-container']}`}>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={handleLogin}
            >
              Войти
            </Button>
          </div>
        </div>

        <div className={`mb-4 ${styles['bottom-title-container']}`}>
          <span className={`text_color_inactive text_type_main-default`}>
            Вы новый пользователь?
          </span>
          <Link to={'/registration'} className="ml-2">
            <span className={`text_type_main-default ${styles['link']}`}>
              Зарегистрироваться
            </span>
          </Link>
        </div>

        <div className={`${styles['bottom-title-container']}`}>
          <span className={`text_color_inactive text_type_main-default`}>
            Забыли пароль?
          </span>
          <Link to={'/forgot-password'} className="ml-2">
            <span className={`text_type_main-default ${styles['link']}`}>
              Восстановить пароль
            </span>
          </Link>
        </div>
      </form>
    </section>
  );
}