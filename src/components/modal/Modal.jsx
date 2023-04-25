import styles from './Modal.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ children, visible, setVisible }) => {
  const classesModal = [styles.Modal];

  if (visible) {
    classesModal.push(styles.active);
  }

  return (
    <div className={classesModal.join(' ')} onClick={() => setVisible(false)}>
      <div
        className={`${styles['Modal-content']}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p>{children}</p>
        <button onClick={() => setVisible(false)}>
          Закрыть диалоговое окно
        </button>
      </div>
    </div>
  );
};

export default Modal;
