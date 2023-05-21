import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { SET_BUN } from '../../services/actions/constructor';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Получаем список ингредиентов.
    dispatch(getItems());
    // Получаем данные для конструктора.
    dispatch({
      type: SET_BUN,
      currentBun: 'Краторная булка N-200i',
    });
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

// {state.error ? (
//   <section className={styles['Error-container']}>
//     <h1>Данные не найдены.</h1>
//   </section>
// )}
