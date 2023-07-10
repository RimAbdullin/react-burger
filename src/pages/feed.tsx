import { FC } from 'react';
import styles from './feed.module.css';
import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FeedOrder from '../components/feed/feed-order/FeedOrder';

export const FeedPage: FC = () => {
  return (
    <main>
      <section className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <FeedOrder />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </main>
  );
};
