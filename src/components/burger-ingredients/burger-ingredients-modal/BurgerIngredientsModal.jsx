import PortalReactDOM from 'react-dom';
import styles from './BurgerIngredientsModal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../../modal-overlay/ModalOverlay';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';

const modalRoot = document.getElementById('react-modals');

const BurgerIngredientsModal = ({ children, onClose }) => {
  return PortalReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <section
        className={`${styles.Modal}`}
        onClick={(e) => e.stopPropagation()}
      >
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
        <IngredientDetails>{children}</IngredientDetails>
      </section>
    </ModalOverlay>,
    modalRoot
  );
};

export default BurgerIngredientsModal;

BurgerIngredientsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.shape(burgerIngredientsObject).isRequired,
};
