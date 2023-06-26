import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useUser } from '../hooks/useUser';

export function ProfilePage(): React.ReactElement {
  const user = useUser();

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const [isChanged, setIsChanged] = useState(false);

  // Получаем данные пользователя.
  useEffect(() => {
    user.getUser();
  }, []);

  // При изменении поля показываем группу кнопок.
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  // При нажатии пункта меню "Выход" выходим из системы.
  const handleLogout = () => {
    user.logout();
  };

  // Устанавливаем значения полей на форме из полученных из запроса данных.
  useEffect(() => {
    if (user.user) {
      setValue({
        ...form,
        name: user.user.name,
        email: user.user.email,
      });
    }
  }, [user.user]);

  // Записываем данные пользователя.
  const handleSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    user.updateUser(form);
  };

  // Отменяем изменения на форме.
  const handleCancel = () => {
    setValue({
      ...form,
      name: user?.user?.name ? user.user.name : '',
      email: user?.user?.email ? user.user.email : '',
      password: '',
    });
  };

  // Если еще выполняется запрос на получение данных пользователя, то не ничего не выполняем.
  // if (user.isLoadingGetUser) {
  //   return null;
  // }

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
              to={'/'}
              className={`text_color_inactive text text_type_main-medium`}
            >
              История заказов
            </NavLink>
          </div>
          <div className={`${styles['menu-container']}`}>
            <NavLink
              to={'/'}
              className={`text_color_inactive text text_type_main-medium`}
              onClick={handleLogout}
            >
              Выход
            </NavLink>
          </div>
        </nav>
      </div>
      <div className={`ml-15 ${styles.content}`}>
        <form className={styles.form} onSubmit={handleSave}>
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
              onChange={onChange}
              extraClass="mb-6"
              icon="EditIcon"
            />
          </div>
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
                <Button htmlType="submit" type="primary" size="medium">
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
