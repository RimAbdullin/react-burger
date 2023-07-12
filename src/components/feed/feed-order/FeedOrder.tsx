import styles from './FeedOrder.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { getWSSelector } from '../../../services/selectors/selector';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { WSActionTypes } from '../../../services/store/types/ws';
import { TWSState } from '../../../services/reducers/ws';

function FeedOrder() {
  const dispatch = useAppDispatch();

  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } =
    useTypedSelector<TWSState>(getWSSelector);

  console.log('=== messages', messages);

  const { orders } = messages;

  console.log('=== orders', orders);

  useEffect(() => {
    // Открытие wev socket.
    dispatch({
      type: WSActionTypes.WS_CONNECTION_START,
      payload: '',
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
      <p>Ошибка соединения</p>
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
        Соберите бургер
      </div>
      <div className={`custom-scroll ${styles['Scroll-area']}`}>
        <div>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-bun'}>Булки</a>
          </div>
          {messages && <ListFeedOrders data={orders}></ListFeedOrders>}
        </div>
      </div>
    </section>
  );
}

export default FeedOrder;
