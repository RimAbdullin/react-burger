import styles from './CardBurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function CardBurgerConstructor(props) {
  const handleClose = () => {};

  return (
    <>
      <section
        className={`ml-4  ${styles['Card-ingredients']} ${styles['Card-border']}`}
      >
        <div
          className={`${styles['Drag-icon-container']} ${styles['Card-border']}`}
        >
          <DragIcon type="primary" />
        </div>
        {/* Контейнер для данных. */}
        <div className={`${styles['Card-data']}`}>
          <ConstructorElement
            extraClass="ml-10"
            key={props.children._id}
            type={props.type}
            isLocked={false}
            handleClose={handleClose}
            text={props.children.name}
            price={props.children.price}
            thumbnail={props.children.image}
          />
        </div>
      </section>
    </>
  );
}

export default CardBurgerConstructor;

CardBurgerConstructor.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
};
