import styles from './FeedOrder.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { getWSSelector } from '../../../services/selectors/selector';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';

import { TWSState } from '../../../services/reducers/ws';

function FeedOrder() {
  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } =
    useTypedSelector<TWSState>(getWSSelector);

  const { orders } = messages;

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
            <ListFeedOrders path="feed" data={orders}></ListFeedOrders>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeedOrder;
