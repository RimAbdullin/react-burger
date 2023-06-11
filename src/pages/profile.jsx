import { useState, useEffect, useRef } from 'react';
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

  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.getUser();
  }, []);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    if (auth.isAuth) {
      auth.logout();
    }
  };

  useEffect(() => {
    if (!auth.isAuth && loading) {
      navigate('/');
    }
    setLoading(true);
  }, [auth.isAuth]);

  useEffect(() => {
    if (auth.user) {
      setValue({
        ...form,
        name: auth.user.name,
        email: auth.user.email,
      });
    }
  }, [auth.user]);

  const handleSave = () => {
    auth.updateUser(form);
  };

  const handleCancel = () => {
    setValue({
      ...form,
      name: auth.user.name,
      email: auth.user.email,
      password: '',
    });
  };

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
          {form && auth.user && (
            <div>
              <Input
                placeholder="Имя"
                value={form.name}
                name="name"
                type="text"
                onChange={onChange}
                extraClass="mb-6"
                icon="EditIcon"
              />
              <Input
                placeholder="Логин"
                value={form.email}
                name="email"
                type="email"
                onChange={onChange}
                extraClass="mb-6"
                icon="EditIcon"
              />
              <PasswordInput
                placeholder="Пароль"
                value={form.password}
                name="password"
                type="password"
                onChange={onChange}
                extraClass="mb-6"
                icon="EditIcon"
              />
            </div>
          )}
          {isChanged && (
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
          )}
        </form>
      </div>
    </section>
  );
}
