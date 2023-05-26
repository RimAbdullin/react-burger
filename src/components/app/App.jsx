import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { getIngredientsItems } from '../../services/actions/ingredients';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // инициализируем объекты с ингредиентами.
    dispatch(getIngredientsItems('Краторная булка N-200i'));
  }, [dispatch]);

  return (
    <section className={styles.Page}>
      <AppHeader />
      <main>
        <section className={styles[`Main-container`]}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>
      </main>
    </section>
  );
}

export default App;
