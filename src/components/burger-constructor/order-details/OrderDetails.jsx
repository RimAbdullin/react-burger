import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';

const OrderDetails = ({ children }) => {
  return (
    <section className={`${styles['Modal-content']}`}>
      {/* Изображение. */}
      <section className={`${styles['Image']}`}>
        <section className={`${styles['Illustration']}`}>
          <img src={children.image} alt=""></img>
        </section>
      </section>
      {/* Наименование */}
      <span className="mt-4 text_type_main-medium">{children.name}</span>
      {/* Питание. */}
      <section className={`mt-8 ${styles['Nutrition-container']}`}>
        <section className={`mr-5 ${styles['Value-container-calories']}`}>
          <section className={`mb-2 ${styles['Value-calories']}`}>
            <span className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </span>
          </section>
          <section className={`${styles['Value-calories']}`}>
            <span className="text text_type_digits-default text_color_inactive">
              {children.calories}
            </span>
          </section>
        </section>

        <section className={`mr-5 ${styles['Value-container']}`}>
          <section className={`mb-2 ${styles['Value']}`}>
            <span className="text text_type_main-default text_color_inactive">
              Белки, г
            </span>
          </section>
          <section className={`${styles['Value']}`}>
            <span className="text text_type_digits-default text_color_inactive">
              {children.proteins}
            </span>
          </section>
        </section>

        <section className={`mr-5 ${styles['Value-container']}`}>
          <section className={`mb-2 ${styles['Value']}`}>
            <span className="text text_type_main-default text_color_inactive">
              Жиры, г
            </span>
          </section>
          <section className={`${styles['Value']}`}>
            <span className="text text_type_digits-default text_color_inactive">
              {children.fat}
            </span>
          </section>
        </section>

        <section className={`${styles['Value-container']}`}>
          <section className={`mb-2 ${styles['Value']}`}>
            <span className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </span>
          </section>
          <section className={`${styles['Value']}`}>
            <span className="text text_type_digits-default text_color_inactive">
              {children.carbohydrates}
            </span>
          </section>
        </section>
      </section>
    </section>
  );
};

export default OrderDetails;

OrderDetails.propTypes = {
  children: PropTypes.shape(burgerIngredientsObject).isRequired,
};
