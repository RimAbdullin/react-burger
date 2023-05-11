import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {
  return (
    <section className={`${styles['Modal-content']}`}>
      <section className={`mt-2 ${styles['Order_id_container']}`}>
        <span className="text text_type_digits-large">034536</span>
      </section>

      <section className={`mt-8 ${styles['Title_id_container']}`}>
        <span className="text text_type_main-medium">идентификатор заказа</span>
      </section>

      <section className={`mt-15 ${styles['Icon_container']}`}>
        <CheckMarkIcon />
      </section>

      <section className={`mt-15 ${styles['Info_container']}`}>
        <span className="text text_type_main-default">
          Ваш заказ начали готовить
        </span>
      </section>

      <section className={`mt-2 ${styles['Info_container']}`}>
        <span className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </span>
      </section>
    </section>
  );
};

export default OrderDetails;
