import { FC, useEffect } from 'react';
import styles from './feed.module.css';
import FeedOrder from '../components/feed/feed-order/FeedOrder';
import FeedInfo from '../components/feed/feed-info/FeedInfo';
import { useAppDispatch } from '../hooks/hooks';
import { NORMA_API_WS } from '../data/data';
import { feedWsActions } from '../services/store/types/feedWsActions';

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Открытие wev socket.
    dispatch({
      type: feedWsActions.wsInit,
      payload: NORMA_API_WS,
    });

    return () => {
      // Закрытие web socket.
      dispatch({
        type: feedWsActions.wsClose,
        payload: '',
      });
    };
  }, []);

  return (
    <main>
      <section className={styles.container}>
        <div
          className={`mt-10 mb-5 text text_type_main-large text_color_primary ${styles['Feed-order-container ']}`}
        >
          Лента заказов
        </div>
        <div className={styles.content}>
          <div className="mr-15">
            <FeedOrder />
          </div>
          <FeedInfo />
        </div>
      </section>
    </main>
  );
};
