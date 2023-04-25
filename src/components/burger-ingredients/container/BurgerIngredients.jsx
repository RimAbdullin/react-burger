import { useState, useEffect } from 'react';
import styles from './BurgerIngredients.module.css';
import TabsBurgerIngredients from '../tabs/TabsBurgerIngredients';
import ListBurgerIngredients from '../list/ListBurgerIngredients.jsx';

function BurgerIngredients() {
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
          bun: data.data.filter((bun) => bun.type == 'bun'),
          main: data.data.filter((bun) => bun.type == 'main'),
          sauce: data.data.filter((bun) => bun.type == 'sauce'),
          loading: false,
        });
      } catch (err) {
        setState({ ...state, error: true });
      }
    };

    getBurgerData();
  }, []);

  const scrollToElement = (v) => {
    const elem = document.getElementById(v);
    elem.scrollIntoView();
  };

  return (
    <section className={`${styles.Container}`}>
      {state.error ? (
        <h1 style={{ textAlign: 'center' }}>Данные не найдены.</h1>
      ) : (
        !state.loading && (
          <>
            <div
              className={`mt-10 mb-5 text text_type_main-large text_color_primary ${styles.Title}`}
            >
              Соберите бургер
            </div>
            <TabsBurgerIngredients click={scrollToElement} />
            <section className={`custom-scroll ${styles['Scroll-area']}`}>
              <ListBurgerIngredients
                id={'id-bun'}
                title={'Булки'}
                data={state.bun}
              ></ListBurgerIngredients>
              <ListBurgerIngredients
                id={'id-sauce'}
                title={'Соусы'}
                data={state.sauce}
              ></ListBurgerIngredients>
              <ListBurgerIngredients
                id={'id-main'}
                title={'Начинка'}
                data={state.main}
              ></ListBurgerIngredients>
            </section>
          </>
        )
      )}
    </section>
  );
}

export default BurgerIngredients;
