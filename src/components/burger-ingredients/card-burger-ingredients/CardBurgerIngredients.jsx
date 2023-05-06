import { useState } from 'react';
import styles from './CardBurgerIngredients.module.css';
import {
  CurrencyIcon,
  Counter,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../../modal/Modal';

function CardBurgerIngredients({ children }) {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    handleCloseModal();
  };

  const modal = (
    <Modal onClose={handleCloseModal}>
      <section className={`${styles['Container']}`}>
        {/* Заголовок. */}
        <section className={`pt-10 ml-10 ${styles['Title-button']}`}>
          <section className={`${styles['Title']}`}>
            <span className="text text_type_main-large text_color_primary">
              Детали ингредиента
            </span>
          </section>
          {/* Иконка закрытия. */}
          <section className={styles['Button-close']} onClick={handleClick}>
            <CloseIcon />
          </section>
        </section>
        <IngredientDetails>{children}</IngredientDetails>
      </section>
    </Modal>
  );

  return (
    <>
      <section
        className={`ml-4 mb-10 mt-6 ${styles['Card-ingredients']}`}
        onClick={handleOpenModal}
      >
        <Counter count={1} size="default" />
        <div className={`mr-4 ml-4 ${styles['Illustration']}`}>
          <img src={children.image} alt="" />
        </div>
        <div className={`mt-1 mb-1 ${styles.Price}`}>
          <span className={`mr-2 text_type_digits-default`}>
            {children.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`text_type_main-default ${styles.Name}`}>
          {children.name}
        </span>
        {visible && modal}
      </section>
    </>
  );
}

export default CardBurgerIngredients;

CardBurgerIngredients.propTypes = {
  children: PropTypes.shape(burgerIngredientsObject).isRequired,
};
