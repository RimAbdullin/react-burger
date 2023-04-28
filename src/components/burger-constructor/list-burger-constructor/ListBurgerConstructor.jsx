import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card-burger-constructor/CardBurgerConstructor';
import PropTypes from 'prop-types';

const ListBurgerConstructor = (props) => {
  const handleClose = () => {};

  return (
    <section>
      <div className={styles['List-container']}>
        {props.data.map((item, index) => (
          <CardBurgerConstructor
            key={item._id}
            type={
              index === 0
                ? 'top'
                : index === props.data.length - 1
                ? 'bottom'
                : undefined
            }
          >
            {item}
          </CardBurgerConstructor>
        ))}
      </div>
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
};
