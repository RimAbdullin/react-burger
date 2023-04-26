import { useState, useEffect } from 'react';
import styles from './BurgerConstructor.module.css';
import ListBurgerConstructor from '../list/ListBurgerConstructor';

function BurgerConstructor() {
  const [state, setState] = useState({
    error: false,
    burgerData: null,
    loading: true,
    bun: null,
    main: null,
    sauce: null,
  });

  useEffect(() => {
    const getBurgerData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(
          `https://norma.nomoreparties.space/api/ingredients`
        );

        const data = await res.json();

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
    <section className={`${styles.Container}`}>
      {state.error ? (
        <h1 style={{ textAlign: 'center' }}>Данные не найдены.</h1>
      ) : (
        !state.loading && (
          <>
            {/* <TabsBurgerIngredients click={scrollToElement} /> */}
            <section className={`mt-25 custom-scroll ${styles['Scroll-area']}`}>
              <ListBurgerConstructor
                data={state.burgerData}
              ></ListBurgerConstructor>
            </section>
          </>
        )
      )}
    </section>
  );
}

export default BurgerConstructor;
