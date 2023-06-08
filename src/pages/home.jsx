import styles from './home.module.css';
import BurgerIngredients from '../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = () => {
  return (
    <main>
      <section className={styles[`Main-container`]}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </main>
  );
};
