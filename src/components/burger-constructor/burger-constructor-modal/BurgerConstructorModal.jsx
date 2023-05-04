import PortalReactDOM from 'react-dom';
import styles from './BurgerConstructorModal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../../modal-overlay/ModalOverlay';
import OrderDetails from '../order-details/OrderDetails';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const BurgerConstructorModal = ({ onClose }) => {
  return PortalReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <section
        className={`${styles.Modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок. */}
        <section className={`mt-10 ml-10 ${styles['Title-button']}`}>
          {/* Иконка закрытия. */}
          <section className={styles['Button-close']} onClick={onClose}>
            <CloseIcon />
          </section>
        </section>
        <OrderDetails></OrderDetails>
      </section>
    </ModalOverlay>,
    modalRoot
  );
};

export default BurgerConstructorModal;

BurgerConstructorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
