import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card-burger-constructor/CardBurgerConstructor';
import PropTypes from 'prop-types';

const ListBurgerConstructor = (props) => {
  return (
    <section>
      {/* Первый элемент булки. */}
      <CardBurgerConstructor
        extraClass={'mb-4 ml-15'}
        type={'top'}
        isLocked={true}
      >
        {props.bun}
      </CardBurgerConstructor>
      <section className={`mb-4 custom-scroll ${styles['Scroll-area']}`}>
        {/* Список ингредиентов. */}
        {props.data.map((item, index) => (
          <CardBurgerConstructor
            extraClass={index !== props.data.length - 1 ? 'mb-4' : ''}
            key={item._id}
            type={undefined}
            isLocked={false}
          >
            {item}
          </CardBurgerConstructor>
        ))}
      </section>
      {/* Последний элемент булки. */}
      <CardBurgerConstructor
        extraClass={'ml-15'}
        type={'bottom'}
        isLocked={true}
      >
        {props.bun}
      </CardBurgerConstructor>
    </section>
  );
};

export default ListBurgerConstructor;

ListBurgerConstructor.propTypes = {
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
  bun: PropTypes.shape({
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
