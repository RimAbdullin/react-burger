import styles from './CardBurgerConstructor.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../modal/Modal';

function CardBurgerConstructor(props) {
  const data = props.children;

  const [modal, setModal] = useState(false);

  return (
    <div
      className={`ml-4 mb-10 mt-6 ${styles['Card-ingredients']} ${styles['Card-border']}`}
      onClick={() => setModal(true)}
    >
      <Counter
        count={9}
        size="default"
        extraClass={`m-0 ${styles['Counter']} ${styles['Card-border']}`}
      />
      <div
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
      </div>
      <Modal visible={modal} setVisible={setModal}>
        {data.name}
      </Modal>
    </div>
  );
}

export default CardBurgerConstructor;
