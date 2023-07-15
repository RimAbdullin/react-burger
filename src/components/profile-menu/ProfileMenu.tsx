import styles from './ProfileMenu.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export function ProfileMenu(): React.ReactElement {
  const user = useUser();

  // При нажатии пункта меню "Выход" выходим из системы.
  const handleLogout = () => {
    user.logout();
  };

  const { pathname } = useLocation();

  const isProfile = pathname === '/profile' ? true : false;

  const isFeed = pathname === '/profile/orders' ? true : false;

  return (
    <div className={`${styles['navigation-container']}`}>
      <nav id="navbar">
        <div className={`${styles['menu-container']}`}>
          <NavLink
            to={'/profile'}
            className={`pl-2 text text_type_main-medium ${
              isProfile ? 'text_color_primary' : 'text_color_inactive'
            }`}
          >
            Профиль
          </NavLink>
        </div>
        <div className={`${styles['menu-container']}`}>
          <NavLink
            to={'/profile/orders'}
            className={`pl-2 text text_type_main-medium ${
              isFeed ? 'text_color_primary' : 'text_color_inactive'
            }`}
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
  );
}
