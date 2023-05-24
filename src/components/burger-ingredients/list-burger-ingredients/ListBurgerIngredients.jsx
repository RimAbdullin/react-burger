import { useRef, useEffect } from 'react';
import styles from './ListBurgerIngredients.module.css';
import CardBurgerIngredients from '../card-burger-ingredients/CardBurgerIngredients';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';

const ListBurgerIngredients = ({ data }) => {
  return (
    <section>
      <div className={styles['List-container']}>
        {data.map((item) => (
          <CardBurgerIngredients key={item._id}>{item}</CardBurgerIngredients>
        ))}
      </div>
    </section>
  );
};

export default ListBurgerIngredients;

ListBurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(burgerIngredientsObject).isRequired)
    .isRequired,
};
