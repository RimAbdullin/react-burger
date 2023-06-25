import PortalReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import React, { ReactNode, useEffect, useRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
  }
}

const Modal: React.FC<IModalProps> = ({ title, children, onClose }) => {
  const modalRoot = document.getElementById('react-modals');

  const closeModal = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    modalRoot &&
    PortalReactDOM.createPortal(
      <>
        <section
          className={`${styles['Modal-container']}`}
          onClick={handleClick}
        >
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
                <CloseIcon type="primary" />
              </section>
            </section>
            {children}
          </section>
        </section>
        <ModalOverlay></ModalOverlay>
      </>,
      modalRoot
    )
  );
};

export default Modal;
