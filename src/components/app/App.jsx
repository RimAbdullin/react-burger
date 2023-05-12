import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../services/appContext';

function App() {
  const [state, setState] = useState({
    error: false,
    loading: true,
    ingredients: null,
    bunName: 'Краторная булка N-200i',
  });

  // Получаем список ингредиентов.
  useEffect(() => {
    const getIngredientsData = async () => {
      setState({ ...state, loading: true });
      try {
        const data = await getIngredients();

        setState({
          ...state,
          ingredients: data.data,
          loading: false,
        });
      } catch (err) {
        setState({ ...state, error: true });
      }
    };
    getIngredientsData();
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
              <BurgerIngredients ingredients={state.ingredients} />
              <IngredientsContext.Provider
                value={{
                  ingredients: state.ingredients,
                  bunName: state.bunName,
                }}
              >
                <BurgerConstructor />
              </IngredientsContext.Provider>
            </section>
          )
        )}
      </main>
    </>
  );
}

export default App;
