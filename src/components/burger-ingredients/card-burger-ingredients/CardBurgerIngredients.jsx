import styles from './CardBurgerIngredients.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function CardBurgerIngredients(props) {
  return (
    <section className={`ml-4 mb-10 mt-6 ${styles['Card-ingredients']}`}>
      <Counter count={1} size="default" />
      <div className={`mr-4 ml-4 ${styles['Illustration']}`}>
        <img src={props.children.image} alt="" />
      </div>
      <div className={`mt-1 mb-1 ${styles.Price}`}>
        <span className={`mr-2 text_type_digits-default`}>
          {props.children.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`text_type_main-default ${styles.Name}`}>
        {props.children.name}
      </span>
    </section>
  );
}

export default CardBurgerIngredients;

CardBurgerIngredients.propTypes = {
  children: PropTypes.shape({
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
  }),
};
