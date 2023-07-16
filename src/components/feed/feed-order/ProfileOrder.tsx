import { useEffect } from 'react';
import styles from './ProfileOrder.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { getWSOrderSelector } from '../../../services/selectors/selector';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';
import { useAppDispatch } from '../../../hooks/hooks';
import { TWSState } from '../../../services/reducers/ws';
import { WSOrderActionTypes } from '../../../services/store/types/wsOrder';

function ProfileOrder() {
  const dispatch = useAppDispatch();

  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } =
    useTypedSelector<TWSState>(getWSOrderSelector);

  const { orders } = messages;

  useEffect(() => {
    // Открытие wev socket.
    dispatch({
      type: WSOrderActionTypes.WS_ORDER_CONNECTION_START,
      payload: '',
    });

    return () => {
      // Закрытие web socket.
      dispatch({
        type: WSOrderActionTypes.WS_ORDER_CONNECTION_CLOSED,
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
      <div
        className={`mt-10 mb-5 text text_type_main-large text_color_primary ${styles.Title}`}
      >
        Лента заказов
      </div>
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
