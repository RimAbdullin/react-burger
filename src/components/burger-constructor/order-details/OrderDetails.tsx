import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderSelector } from '../../../services/selectors/selector';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

const OrderDetails = () => {
  // Номер заказа.
  const { orderNumber, orderRequest, orderFailed } =
    useTypedSelector(getOrderSelector);

  return (
    <section className={`${styles['Modal-content']}`}>
      <div className={`mt-4 ${styles['Order_id_container']}`}>
        {orderRequest && (
          <span className="text text_type_main-medium">Получаем номер</span>
        )}
        {!orderRequest && !orderFailed && (
          <span className="text text_type_digits-large">{orderNumber}</span>
        )}
      </div>

      <div className={`mt-8 ${styles['Title_id_container']}`}>
        <span className="text text_type_main-medium">идентификатор заказа</span>
      </div>

      <div className={`mt-15 ${styles['Icon_container']}`}>
        <CheckMarkIcon type="primary" />
      </div>

      <div className={`mt-15 ${styles['Info_container']}`}>
        <span className="text text_type_main-default">
          Ваш заказ начали готовить
        </span>
      </div>

      <div className={`mt-2 mb-30 ${styles['Info_container']}`}>
        <span className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </section>
  );
};

export default OrderDetails;
