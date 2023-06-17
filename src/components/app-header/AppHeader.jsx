import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './App-header.module.css';
import { useLocation, NavLink } from 'react-router-dom';

function AppHeader() {
  const { pathname } = useLocation();

  const isConstructor = pathname === '/' ? true : false;

  const isFeed = pathname === '/feed' ? true : false;

  const isProfile = pathname === '/profile' ? true : false;

  return (
    <header>
      <nav className={`${styles['App-header']}`}>
        <div className={`${styles['Content']}`}>
          <div
            className={`${styles['Constructor-container']} ${styles['Flex-container']}`}
          >
            <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
            <NavLink
              to={'/'}
              className={`pl-2 text text_type_main-default ${
                isConstructor ? 'text_color_primary' : 'text_color_inactive'
              }`}
            >
              Конструктор
            </NavLink>
          </div>
          <div
            className={`ml-2 ${styles['Order-feed-container']} ${styles['Flex-container']}`}
          >
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
            <NavLink
              className={`pl-2 text text_type_main-default ${
                isFeed ? 'text_color_primary' : 'text_color_inactive'
              }`}
            >
              Лента заказов
            </NavLink>
          </div>
          <div className={`${styles.Logo}`}>
            <Logo />
          </div>
          <div
            className={`${styles['Profile-container']} ${styles['Flex-container']}`}
          >
            <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
            <NavLink
              to={'/profile'}
              className={`pl-2 text text_type_main-default ${
                isProfile ? 'text_color_primary' : 'text_color_inactive'
              }`}
            >
              Личный кабинет
            </NavLink>

            {/* <Link
              to={'/registration'}
              className={`pl-2 text text_type_main-default text_color_inactive`}
            >
              Регистрация
            </Link>

            <Link
              to={'/login'}
              className={`pl-2 text text_type_main-default text_color_inactive`}
            >
              Вход
            </Link> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
