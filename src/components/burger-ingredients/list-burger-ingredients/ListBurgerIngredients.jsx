import CardBurgerIngredients from '../card-burger-ingredients/CardBurgerIngredients';
import styles from './ListBurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';

const ListBurgerIngredients = ({ id, title, data }) => {
  return (
    <section>
      <div className={`mt-10 text text_type_main-medium text_color_primary`}>
        <a id={id}>{title}</a>
      </div>
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
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(burgerIngredientsObject).isRequired)
    .isRequired,
  title: PropTypes.string.isRequired,
};
