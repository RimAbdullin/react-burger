import styles from './feed.module.css';
import BurgerIngredients from '../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const FeedPage = () => {
  return (
    <main>
      <section className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </main>
  );
};
