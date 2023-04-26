import styles from './CardBurgerConstructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  DeleteIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../modal/Modal';

function CardBurgerConstructor(props) {
  const data = props.children;

  const [modal, setModal] = useState(false);

  return (
    <div
      className={`ml-4  ${styles['Card-ingredients']} ${styles['Card-border']}`}
      onClick={() => setModal(true)}
    >
      {/* Кнопка слева. */}
      <div
        className={`${styles['Drag-icon-container']} ${styles['Card-border']}`}
      >
        <DragIcon type="primary" />
      </div>
      {/* Контейнер для данных. */}
      <div className={`${styles['Card-data']}`}>
        {/* Контейнер для иконки. */}
        <div
          className={`ml-6 ${styles['Icon-container']} ${styles['Card-border']}`}
        >
          {/* Иконка */}
          <img className={styles.Icon} src={data.image} alt="" />
        </div>
        {/* Наименование */}
        <div
          className={`ml-5  ${styles['Name-container']} ${styles['Card-border']}`}
        >
          <span className={`text_type_main-default ${styles.Name}`}>
            {data.name}
          </span>
        </div>
        {/* Стоимость. */}
        <div
          className={`ml-5 ${styles['Price-container']} ${styles['Card-border']}`}
        >
          <div>
            <span className={`mr-2 text_type_digits-default`}>
              {data.price}
            </span>
          </div>
          <div className={`${styles['Price-icon']}`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        {/* иконка корзины */}
        <div className="ml-5 mr-8">
          <DeleteIcon type="primary" />
        </div>
      </div>

      {/* <div
        className={`mr-4 ml-4 ${styles['Illustration']} ${styles['Card-border']}`}
      >
        <img src={data.image} alt="" />
      </div>
      <div className={`mt-1 mb-1 ${styles.Price} ${styles['Card-border']}`}>
        <div>
          <span className={`text_type_digits-default`}>{data.price}</span>
        </div>
        <div className={`${styles['Icon']}`}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <div className={`${styles.Name}`}>
        <span
          className={`text_type_main-default`}
          style={{ textAlign: 'center' }}
        >
          {data.name}
        </span>
      </div> */}
      <Modal visible={modal} setVisible={setModal}>
        {data.name}
      </Modal>
    </div>
  );
}

export default CardBurgerConstructor;
