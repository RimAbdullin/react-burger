import { FC, useEffect } from 'react';
import styles from './feed.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FeedOrder from '../components/feed/feed-order/FeedOrder';
import FeedInfo from '../components/feed/feed-info/FeedInfo';
import { useAppDispatch } from '../hooks/hooks';
import { WSActionTypes } from '../services/store/types/ws';
import { NORMA_API_WS } from '../data/data';

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Открытие wev socket.
    dispatch({
      type: WSActionTypes.WS_CONNECTION_START,
      payload: NORMA_API_WS,
    });

    return () => {
      // Закрытие web socket.
      dispatch({
        type: WSActionTypes.WS_CONNECTION_CLOSED,
        payload: '',
      });
    };
  }, []);

  return (
    <main>
      <section className={styles.container}>
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
      </section>
    </main>
  );
};
