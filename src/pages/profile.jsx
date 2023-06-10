import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { useNavigate, NavLink } from 'react-router-dom';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAuth } from '../hooks/useAuth';

export function ProfilePage() {
  const auth = useAuth();

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    if (auth.isAuth) {
      auth.logout();
      navigate('/');
    }
  };

  useEffect(() => {
    if (!auth.isAuth) {
      navigate('/');
    }
  }, [auth.isAuth]);

  const handleSave = () => {};

  const handleCancel = () => {};

  return (
    <section className={styles.container}>
      <div className={`${styles['navigation-container']}`}>
        <nav id="navbar">
          <div className={`${styles['menu-container']}`}>
            <NavLink
              to={'/profile'}
              className="text text_type_main-medium text_color_primary"
            >
              Профиль
            </NavLink>
          </div>
          <div className={`${styles['menu-container']}`}>
            <NavLink
              className={`text_color_inactive text text_type_main-medium`}
            >
              История заказов
            </NavLink>
          </div>
          <div className={`${styles['menu-container']}`}>
            <NavLink
              className={`text_color_inactive text text_type_main-medium`}
              onClick={handleLogout}
            >
              Выход
            </NavLink>
          </div>
        </nav>
      </div>
      <div className={`ml-15 ${styles.content}`}>
        <form className={styles.form}>
          <Input
            placeholder="Имя"
            value={form.name}
            name="name"
            onChange={onChange}
            extraClass="mb-6"
          />
          <Input
            placeholder="Логин"
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
          <div className={`${styles['actions']}`}>
            <div className={`${styles['button-container']}`}>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={handleCancel}
              >
                Отмена
              </Button>
            </div>

            <div className={`${styles['button-container']}`}>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={handleSave}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
