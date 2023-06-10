import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './App-header.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector } from '../../services/selectors/selector';

function AppHeader() {
  const { isAuth } = useSelector(getAuthSelector);

  return (
    <header>
      <nav className={`${styles['App-header']}`}>
        <div className={`${styles['Content']}`}>
          <div
            className={`${styles['Constructor-container']} ${styles['Flex-container']}`}
          >
            <BurgerIcon />
            <a
              className={`pl-2 text text_type_main-default text_color_primary`}
              href="#"
            >
              Конструктор
            </a>
          </div>
          <div
            className={`ml-2 ${styles['Order-feed-container']} ${styles['Flex-container']}`}
          >
            <ListIcon />
            <a
              className={'pl-2 text text_type_main-default text_color_inactive'}
              href="#"
            >
              Лента заказов
            </a>
          </div>
          <div className={`${styles.Logo}`}>
            <Logo />
          </div>
          <div
            className={`${styles['Profile-container']} ${styles['Flex-container']}`}
          >
            <ProfileIcon />
            <Link
              to={isAuth ? '/profile' : '/login'}
              className={`pl-2 text text_type_main-default text_color_inactive`}
            >
              Личный кабинет
            </Link>

            {/* <a
              className={`pl-2 text text_type_main-default text_color_inactive`}
              href="#"
            >
              Личный кабинет
            </a> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
