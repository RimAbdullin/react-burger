import PortalReactDOM from 'react-dom';

import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/ModalOverlay';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, title, onClose }) => {
  return PortalReactDOM.createPortal(
    <ModalOverlay>
      <section className={`${styles.Modal}`}>
        {/* <div className={`${styles['Modal-content']}`}> */}
        <div>{title}</div>
        {children}
        <button onClick={onClose}>закрыть</button>
        {/* </div> */}
      </section>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
