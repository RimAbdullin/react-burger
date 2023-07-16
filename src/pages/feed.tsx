import { FC } from 'react';
import styles from './feed.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FeedOrder from '../components/feed/feed-order/FeedOrder';
import FeedInfo from '../components/feed/feed-info/FeedInfo';

export const FeedPage: FC = () => {
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
