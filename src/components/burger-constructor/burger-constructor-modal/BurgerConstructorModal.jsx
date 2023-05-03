import PortalReactDOM from 'react-dom';

import styles from './BurgerConstructorModal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../../modal-overlay/ModalOverlay';
import OrderDetails from '../order-details/OrderDetails';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';

const modalRoot = document.getElementById('react-modals');

const BurgerConstructorModal = ({ children, onClose }) => {
  return PortalReactDOM.createPortal(
    <ModalOverlay>
      <section className={`${styles.Modal}`}>
        {/* Заголовок. */}
        <section className={`mt-10 ml-10 ${styles['Title-button']}`}>
          <section className={`${styles['Title']}`}>
            <span className="text text_type_main-large text_color_primary">
              Детали ингредиента
            </span>
          </section>
          {/* Иконка закрытия. */}
          <section className={styles['Button-close']} onClick={onClose}>
            <CloseIcon />
          </section>
        </section>
        <OrderDetails>{children}</OrderDetails>
      </section>
    </ModalOverlay>,
    modalRoot
  );
};

export default BurgerConstructorModal;

BurgerConstructorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.shape(burgerIngredientsObject).isRequired,
};
