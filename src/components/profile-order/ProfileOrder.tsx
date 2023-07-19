import { useTypedSelector } from '../../hooks/useTypeSelector';
import { TOrderWsState } from '../../services/reducers/orderWsReducer';
import { getOrderWSSelector } from '../../services/selectors/selector';
import styles from './ProfileOrder.module.css';
import { ListProfileOrders } from './list-profile-order/ListFeedOrders';

function ProfileOrder() {
  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } =
    useTypedSelector<TOrderWsState>(getOrderWSSelector);

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
            <ListProfileOrders data={orders}></ListProfileOrders>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileOrder;
