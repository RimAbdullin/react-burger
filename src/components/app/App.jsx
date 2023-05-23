import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useSelector, useDispatch } from 'react-redux';
import {
  getIngredientsItems,
  setBun,
} from '../../services/actions/ingredients';

// import { SET_BUN } from '../../services/actions/constructor';

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
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </main>
    </section>
  );
}

export default App;
