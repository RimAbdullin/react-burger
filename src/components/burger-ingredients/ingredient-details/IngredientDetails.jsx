import PortalReactDOM from 'react-dom';
import styles from './IngredientDetails.module.css';

const IngredientDetails = ({ children, title, onClose }) => {
  return (
    <section className={`${styles.Modal}`}>
      <div>{title}</div>
      {children}
      <button onClick={onClose}>закрыть</button>
    </section>
  );
};

export default IngredientDetails;
