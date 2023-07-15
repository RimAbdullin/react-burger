import PortalReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import React, { ReactNode, useEffect, useRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  isTitle: boolean;
}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
  }
}

const Modal: React.FC<IModalProps> = ({
  isTitle,
  title,
  children,
  onClose,
}) => {
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
          <div
            className={`${styles.Modal}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isTitle && (
              <div className={`pt-10 ml-10 ${styles['Title-button']}`}>
                <div className={`${styles['Title']}`}>
                  <span className="text text_type_main-large text_color_primary">
                    {title}
                  </span>
                </div>
                {/* Иконка закрытия. */}
                <div className={styles['Button-close']} onClick={handleClick}>
                  <CloseIcon type="primary" />
                </div>
              </div>
            )}
            {children}
          </div>
        </section>
        <ModalOverlay></ModalOverlay>
      </>,
      modalRoot
    )
  );
};

export default Modal;
