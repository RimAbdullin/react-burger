import { useState, useEffect } from 'react';
import styles from './BurgerIngredients.module.css';
import TabsBurgerIngredients from './tabs-burger-ingredients/TabsBurgerIngredients';
import ListBurgerIngredients from './list-burger-ingredients/ListBurgerIngredients.jsx';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../utils/prop-types';

function BurgerIngredients({ data }) {
  const [state, setState] = useState({
    bun: null,
    main: null,
    sauce: null,
    loading: true,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    setState({
      ...state,
      bun: data.filter((bun) => bun.type == 'bun'),
      main: data.filter((bun) => bun.type == 'main'),
      sauce: data.filter((bun) => bun.type == 'sauce'),
      loading: false,
    });
  }, []);

  const scrollToElement = (v) => {
    const elem = document.getElementById(v);
    elem.scrollIntoView();
  };

  return (
    <section className={`${styles.Container}`}>
      {!state.loading && (
        <>
          <section
            className={`mt-10 mb-5 text text_type_main-large text_color_primary ${styles.Title}`}
          >
            Соберите бургер
          </section>
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
      )}
    </section>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ ...burgerIngredientsObject }).isRequired
  ).isRequired,
};
