import styles from './CardBurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function CardBurgerConstructor(props) {
  const handleClose = () => {};

  return (
    <section className={`ml-4  ${styles['Card-ingredients']}`}>
      {!props.type && <DragIcon type="primary" />}
      <ConstructorElement
        extraClass={'ml-10 mr-2 ' + props.extraClass}
        key={props.children._id}
        type={props.type}
        isLocked={props.isLocked}
        handleClose={handleClose}
        text={props.children.name}
        price={props.children.price}
        thumbnail={props.children.image}
      />
    </section>
  );
}

export default CardBurgerConstructor;

CardBurgerConstructor.propTypes = {
  type: PropTypes.string || undefined,
  isLocked: PropTypes.bool,
  extraClass: PropTypes.string,
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
