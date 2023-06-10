import { useCallback, useState } from 'react';
import styles from './forgot-password.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

import { Link, useLocation } from 'react-router-dom';

// import { useAuth } from '../services/auth';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {
  // let auth = useAuth();

  const [form, setValue] = useState({ email: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  // let login = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     // auth.signIn(form);
  //   },
  //   [auth, form]
  // );

  // if (auth.user) {
  //   return <Navigate to={'/'} />;
  // }

  const navigate = useNavigate();

  const handleClickRestore = (e) => {
    console.log(e.target);
    // e.preventDefault();
    console.log('123');
    navigate('/reset-password');
  };

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
              onClick={handleClickRestore}
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