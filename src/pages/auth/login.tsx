import { useCallback, useState } from 'react';
import styles from './login.module.css';

import { useLocation, Link, Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const user = useUser();

  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      user.login(form);
    },
    [user, form]
  );

  const location = useLocation();

  // Если еще выполняется запрос на вход, то ничего не выполняем.
  if (user.isLoadingLogin) {
    return null;
  }

  // Если пользователь успешно зарегистрировался, то переходим на главную страницу.
  if (user.isAuthChecked && user.user) {
    const redirectTo = location?.state?.redirectTo?.pathname
      ? location.state.redirectTo.pathname
      : '/';
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={`mb-6 ${styles['title-container']}`}>
          <span className={`text_type_main-medium`}>Вход</span>
        </div>
        <input type="email"></input>
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
            <Button htmlType="submit" type="primary" size="medium">
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
