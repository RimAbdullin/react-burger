import { useTypedSelector } from '../../../hooks/useTypeSelector';
import styles from './ProfileOrder.module.css';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';
import { TWSState } from '../../../services/reducers/ws';
import { getWSSelector } from '../../../services/selectors/selector';

function ProfileOrder() {
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
            <ListFeedOrders path="profile" data={orders}></ListFeedOrders>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileOrder;
