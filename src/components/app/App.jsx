import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { getIngredientsItems } from '../../services/actions/ingredients';
import { setBun } from '../../services/actions/cartIngredients';

// import { SET_BUN } from '../../services/actions/constructor';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Получаем список ингредиентов.
    const bun = dispatch(getIngredientsItems());
    console.log(bun);

    dispatch(setBun('Краторная булка N-200i', bun));
  }, [dispatch]);

  return (
    <section className={styles.Page}>
      <AppHeader />
      <main>
        <section className={styles[`Main-container`]}>
          <BurgerIngredients />
          {/* <BurgerConstructor /> */}
        </section>
      </main>
    </section>
  );
}

export default App;
