import styles from './CardBurgerIngredients.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../modal/Modal';
import PropTypes from 'prop-types';

function CardBurgerIngredients(props) {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const modal = (
    <Modal header="Внимание!" onClose={handleCloseModal}>
      <p>Спасибо за внимание!</p>
      <p>Открывай меня, если станет скучно :)</p>
    </Modal>
  );

  return (
    <>
      {/* <div style={{ overflow: 'hidden' }}> */}
      {/* <button onClick={handleOpenModal}>Открыть модальное окно</button>
        {visible && modal} */}
      {/* </div> */}
      <div
        className={`ml-4 mb-10 mt-6 ${styles['Card-ingredients']} ${styles['Card-border']}`}
        onClick={handleOpenModal}
      >
        <Counter
          count={1}
          size="default"
          extraClass={`m-0 ${styles['Counter']} ${styles['Card-border']}`}
        />
        <div
          className={`mr-4 ml-4 ${styles['Illustration']} ${styles['Card-border']}`}
        >
          <img src={props.children.image} alt="" />
        </div>
        <div className={`mt-1 mb-1 ${styles.Price} ${styles['Card-border']}`}>
          <div>
            <span className={`text_type_digits-default`}>
              {props.children.price}
            </span>
          </div>
          <div className={`${styles['Icon']}`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={`${styles.Name} ${styles['Card-border']}`}>
          <span className={`text_type_main-default`}>
            {props.children.name}
          </span>
        </div>
      </div>
      {visible && modal}
    </>
  );
}

export default CardBurgerIngredients;

CardBurgerIngredients.propTypes = {
  children: PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
  }),
};
