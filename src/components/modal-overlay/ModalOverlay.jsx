import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ children }) => {
  return <section className={`${styles['Modal-overlay']}`}>{children}</section>;
};

export default ModalOverlay;
