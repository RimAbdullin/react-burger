import { useState, useEffect } from 'react';
import styles from './BurgerIngredients.module.css';
import TabsBurgerIngredients from './tabs-burger-ingredients/TabsBurgerIngredients';
import ListBurgerIngredients from './list-burger-ingredients/ListBurgerIngredients.jsx';
import PropTypes from 'prop-types';

function BurgerIngredients(props) {
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
      bun: props.data.filter((bun) => bun.type == 'bun'),
      main: props.data.filter((bun) => bun.type == 'main'),
      sauce: props.data.filter((bun) => bun.type == 'sauce'),
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
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ),
};
