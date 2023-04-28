import ReactDOM from 'react-dom/client';
import PortalReactDOM from 'react-dom';

import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');
// const modalRoot = ReactDOM.createRoot(document.getElementById('react-modals'));

console.log(modalRoot);

const Modal = ({ children, header, onClose }) => {
  return PortalReactDOM.createPortal(
    <>
      <div className={`${styles.Modal}`}>
        <div className={`${styles['Modal-content']}}`}>
          <div>{header}</div>
          {children}

          <button onClick={onClose}>закрыть</button>
        </div>
      </div>
      <div onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
