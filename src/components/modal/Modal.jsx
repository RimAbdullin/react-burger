import PortalReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, onClose }) => {
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
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
