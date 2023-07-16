import { useEffect, useMemo, useState } from 'react';
import styles from './FeedInfo.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { getWSSelector } from '../../../services/selectors/selector';
import { TWSState } from '../../../services/reducers/ws';
import { IFeedOrderData } from '../../../services/common/interfaces';

interface IDoneResult {
  num?: number;
  done?: IFeedOrderData[];
}

function FeedInfo() {
  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } =
    useTypedSelector<TWSState>(getWSSelector);

  const [total, setTotal] = useState(0);
  const [totalDay, setTotalDay] = useState(0);
  const [pending, setPending] = useState<IFeedOrderData[]>([]);

  const [doneResult, setDoneResult] = useState<IDoneResult[]>([]);

  useEffect(() => {
    if (messages && messages.orders) {
      setTotal(messages.total);
      setTotalDay(messages.totalToday);

      const filterDone = messages.orders.filter(
        (item) => item.status === 'done'
      );
      const filterPending = messages.orders.filter(
        (item) => item.status !== 'done'
      );

      setPending(filterPending);

      let arr: IFeedOrderData[] = [];
      const result: IDoneResult[] = [];

      let num = 1;
      filterDone.map((item, index) => {
        arr.push(item);

        if (index !== 0 && (index + 1) % 10 === 0) {
          result.push({ num: num, done: arr });
          arr = [];
          num += 1;
        } else {
        }
      });

      setDoneResult(result);
    }
  }, [messages, messages.total, messages.totalToday]);

  return !wsConnected ? (
    <div className={styles['Info-container']}>
      <p>Идет загрузка ...</p>
    </div>
  ) : error ? (
    <div className={styles['Info-container']}>
      <h1>Данные не найдены.</h1>
    </div>
  ) : (
    <section className={`${styles.Container}`}>
      {/* Статус заказа. */}
      <div className={`mb-15 ${styles['Status-container']}`}>
        {/* Готовы. */}
        <div className={`mr-9 ${styles['Status-details-container']}`}>
          {/* Заголовок. */}
          <div className={`mb-6 ${styles['Status-title-container']}`}>
            <span className="text text_type_main-medium">Готовы:</span>
          </div>

          {/* Данные. */}
          <div className={`custom-scroll ${styles['Status-data-container']}`}>
            {doneResult.map((itemResult) => (
              <div
                key={itemResult.num}
                className={`mb-2 mr-2 ${styles['Status-data']}`}
              >
                {itemResult.done?.map((item) => (
                  <span
                    key={item._id}
                    className={`text text_type_digits-default`}
                  >
                    {item.number}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Готовятся. */}
        <div className={`${styles['Status-details-container']}`}>
          <div className={`mb-6 ${styles['Status-title-container']}`}>
            <span className="text text_type_main-medium">В работе:</span>
          </div>

          {/* Данные. */}
          <div className={`mb-6 ${styles['Status-data-pending-container']}`}>
            {pending.map((item) => (
              <span key={item._id} className="text text_type_digits-default">
                {item.number}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`mb-15 ${styles['Completed-container']}`}>
        <div className={`${styles['Title-completed-container']}`}>
          <span className="text text_type_main-medium">
            Выполнено за все время:
          </span>
        </div>
        <div className={`${styles['Data-completed-container']}`}>
          <span className="text text_type_digits-large">{total}</span>
        </div>
      </div>

      <div className={`${styles['Completed-container']}`}>
        <div className={`${styles['Title-completed-container']}`}>
          <span className="text text_type_main-medium">
            Выполнено за сегодня:
          </span>
        </div>
        <div className={`${styles['Data-completed-container']}`}>
          <span className="text text_type_digits-large">{totalDay}</span>
        </div>
      </div>
    </section>
  );
}

export default FeedInfo;
