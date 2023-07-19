import styles from './FeedOrder.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';
import { TFeedWsState } from '../../../services/reducers/feedWsReducer';
import { getFeedWSSelector } from '../../../services/selectors/selector';

function FeedOrder() {
  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } =
    useTypedSelector<TFeedWsState>(getFeedWSSelector);

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
            <ListFeedOrders data={orders}></ListFeedOrders>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeedOrder;
