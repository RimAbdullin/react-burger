import { useCallback, useEffect, useState } from 'react';
import styles from './registration.module.css';
import { Link, useNavigate } from 'react-router-dom';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRegistration } from '../../hooks/useRegistration';

export function RegistrationPage() {
  const registration = useRegistration();

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleRegistration = useCallback(
    (e) => {
      e.preventDefault();
      registration.registration(form);
    },
    [form]
  );

  useEffect(() => {
    if (registration.isSuccess) {
      navigate('/login');
    }
  }, [registration.isSuccess]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form}>
          <div className={`mb-6 ${styles['title-container']}`}>
            <span className={`text_type_main-medium`}>Регистрация</span>
          </div>
          <Input
            placeholder="Имя"
            value={form.name}
            name="name"
            onChange={onChange}
            extraClass="mb-6"
          />
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
                onClick={handleRegistration}
              >
                Зарегистрироваться
              </Button>
            </div>
          </div>

          <div className={`${styles['bottom-title-container']}`}>
            <span className={`text_color_inactive text_type_main-default`}>
              Уже зарегистрированы?
            </span>
            <Link to={`/login`} relative="path" className="ml-2">
              <span className={`text_type_main-default ${styles['link']}`}>
                Войти
              </span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}