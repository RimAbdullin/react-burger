import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ModalOverlay = ({ children, onClose }) => {
  const closeModal = (e) => {
    if (e.keyCode == 27) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  return (
    <section className={`${styles['Modal-overlay']}`} onClick={onClose}>
      {children}
    </section>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
