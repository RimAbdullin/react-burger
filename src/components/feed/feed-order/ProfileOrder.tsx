import { useEffect } from 'react';
import styles from './ProfileOrder.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';
import { useAppDispatch } from '../../../hooks/hooks';
import { TWSState } from '../../../services/reducers/ws';
import { getWSSelector } from '../../../services/selectors/selector';
import { WSActionTypes } from '../../../services/store/types/ws';
import { getCookie } from '../../../services/common/common';
import { NORMA_API_ORDERS_WS } from '../../../data/data';

function ProfileOrder() {
  const dispatch = useAppDispatch();

  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } =
    useTypedSelector<TWSState>(getWSSelector);

  const { orders } = messages;

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

  return !wsConnected ? (
    <section className={styles['Info-container']}>
      <p>Идет загрузка ...</p>
    </section>
  ) : error ? (
    <section className={styles['Info-container']}>
      <h1>Данные не найдены.</h1>
    </section>
  ) : (
    <section className={`${styles.Container}`}>
      <div className={`custom-scroll ${styles['Scroll-area']}`}>
        <div>
          {messages && messages.orders && (
            <ListFeedOrders path="profile" data={orders}></ListFeedOrders>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileOrder;
