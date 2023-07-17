import { useEffect } from 'react';
import styles from './profileOrder.module.css';
import { useUser } from '../hooks/useUser';
import { ProfileMenu } from '../components/profile-menu/ProfileMenu';
import ProfileOrder from '../components/feed/feed-order/ProfileOrder';
import { useAppDispatch } from '../hooks/hooks';
import { getCookie } from '../services/common/common';
import { WSActionTypes } from '../services/store/types/ws';
import { NORMA_API_ORDERS_WS } from '../data/data';

export function ProfileOrderPage(): React.ReactElement {
  const user = useUser();

  // Получаем данные пользователя.
  useEffect(() => {
    user.getUser();
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Открытие wev socket.
    const accessToken = getCookie('accessToken');
    let token = '';
    if (accessToken) {
      token = accessToken.split(' ')[1];
    }

    dispatch({
      type: WSActionTypes.WS_CONNECTION_START,
      payload: NORMA_API_ORDERS_WS + '?token=' + token,
    });

    return () => {
      // Закрытие web socket.
      dispatch({
        type: WSActionTypes.WS_CONNECTION_CLOSED,
        payload: '',
      });
    };
  }, []);

  return (
    <>
      <section className={styles.container}>
        <ProfileMenu />
        <div className={`ml-15 ${styles.content}`}>
          <ProfileOrder />
        </div>
      </section>
    </>
  );
}
