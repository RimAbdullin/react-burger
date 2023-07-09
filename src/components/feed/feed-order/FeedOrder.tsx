import styles from './BurgerIngredients.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { getWSSelector } from '../../../services/selectors/selector';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';

function FeedOrder() {
  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } = useTypedSelector(getWSSelector);

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
        Соберите бургер
      </div>
      <div className={`custom-scroll ${styles['Scroll-area']}`}>
        <div>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-bun'}>Булки</a>
          </div>
          {/* <ListFeedOrders data={messages}></ListFeedOrders> */}
        </div>
      </div>
    </section>
  );
}

export default FeedOrder;
