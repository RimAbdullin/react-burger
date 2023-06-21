import PortalReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ title, children, onClose }) => {
  const closeModal = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return PortalReactDOM.createPortal(
    <>
      <section className={`${styles['Modal-container']}`} onClick={handleClick}>
        <section
          className={`${styles.Modal}`}
          onClick={(e) => e.stopPropagation()}
        >
          <section className={`pt-10 ml-10 ${styles['Title-button']}`}>
            <section className={`${styles['Title']}`}>
              <span className="text text_type_main-large text_color_primary">
                {title}
              </span>
            </section>
            {/* Иконка закрытия. */}
            <section className={styles['Button-close']} onClick={handleClick}>
              <CloseIcon />
            </section>
          </section>
          {children}
        </section>
      </section>
      <ModalOverlay onClose={onClose}></ModalOverlay>
    </>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
