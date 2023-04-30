import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { getIngredients } from '../../utils/burger-api';

function App() {
  const [state, setState] = useState({
    error: false,
    burgerData: null,
    loading: true,
  });

  useEffect(() => {
    const getBurgerData = async () => {
      setState({ ...state, loading: true });
      try {
        const data = await getIngredients();

        setState({
          burgerData: data.data,
          loading: false,
        });
      } catch (err) {
        setState({ ...state, error: true });
      }
    };
    getBurgerData();
  }, []);

  return (
    <>
      <header>
        <AppHeader />
      </header>
      <main>
        {state.error ? (
          <section className={styles['Error-container']}>
            <h1>Данные не найдены.</h1>
          </section>
        ) : (
          !state.loading && (
            <section className={styles[`Main-container`]}>
              <BurgerIngredients data={state.burgerData} />
              <BurgerConstructor data={state.burgerData} />
            </section>
          )
        )}
      </main>
    </>
  );
}

export default App;
