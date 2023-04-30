import styles from './ListBurgerIngredients.module.css';
import CardBurgerIngredients from '../card-burger-ingredients/CardBurgerIngredients';
import PropTypes from 'prop-types';

const ListBurgerIngredients = (props) => {
  return (
    <section>
      <div className={`mt-10 text text_type_main-medium text_color_primary`}>
        <a id={props.id}>{props.title}</a>
      </div>
      <div className={styles['List-container']}>
        {props.data.map((item) => (
          <CardBurgerIngredients key={item._id}>{item}</CardBurgerIngredients>
        ))}
      </div>
    </section>
  );
};

export default ListBurgerIngredients;

ListBurgerIngredients.propTypes = {
  id: PropTypes.string.isRequired,
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
  title: PropTypes.string.isRequired,
};
